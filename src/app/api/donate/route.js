// app/api/donate/route.js
import { prisma } from '@/lib/prisma';

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, bkash, note } = body;

    if (!name || !bkash) {
      return new Response(JSON.stringify({ error: 'Name and Bkash are required.' }), { status: 400 });
    }

    const newDonor = await prisma.donor.create({
      data: {
        name,
        bkash,
        note,
        status: 'pending',
      },
    });

    return Response.json(newDonor);
  } catch (error) {
    console.error('Donation error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
