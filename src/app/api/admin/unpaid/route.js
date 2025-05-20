import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: Get all unpaid donors
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

// POST: Add a new unpaid donor
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

// DELETE: Delete an unpaid donor by ID
export async function DELETE(req) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'Missing donor ID' }, { status: 400 });
    }

    const deletedDonor = await prisma.unpaidDonor.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Donor deleted', donor: deletedDonor });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete donor' }, { status: 500 });
  }
}
