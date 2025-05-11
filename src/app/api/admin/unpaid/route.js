import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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
