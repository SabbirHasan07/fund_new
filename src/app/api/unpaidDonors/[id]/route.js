import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PUT(req, { params }) {
  const { id } = params;

  try {
    const updated = await prisma.unpaidDonor.update({
      where: { id },
      data: { status: 'in progress' }, // ✅ only update status
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating status:', error);
    return NextResponse.json({ error: 'Failed to update status' }, { status: 500 });
  }
}
