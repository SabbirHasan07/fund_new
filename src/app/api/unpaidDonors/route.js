// app/api/unpaidDonors/route.js
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// Fetch all unpaid donors
export async function GET() {
  try {
    const donors = await prisma.unpaidDonor.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(donors);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch unpaid donors' }, { status: 500 });
  }
}

// Add a new unpaid donor
export async function POST(req) {
  try {
    const { name, bkash } = await req.json();

    if (!name || !bkash) {
      return NextResponse.json({ error: 'Missing name or bkash' }, { status: 400 });
    }

    const donor = await prisma.unpaidDonor.create({
      data: { name, bkash },
    });

    return NextResponse.json(donor);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add unpaid donor' }, { status: 500 });
  }
}

// Update a donor's status to 'in progress'
export async function PUT(req) {
  const { id } = req.url.split('/').pop(); // Get the ID from the URL
  try {
    const donor = await prisma.unpaidDonor.update({
      where: { id: String(id) },
      data: { status: 'in progress' },
    });

    return NextResponse.json(donor);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update donor status' }, { status: 500 });
  }
}
