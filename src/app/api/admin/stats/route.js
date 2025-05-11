// app/api/admin/stats/route.js
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const meta = await prisma.donationMeta.findUnique({
      where: { id: 'main' },
    });

    return new Response(
      JSON.stringify(meta || { totalDonation: 0, monthlyDonation: 0 }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error loading stats' }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    const updated = await prisma.donationMeta.upsert({
      where: { id: 'main' },
      update: {
        totalDonation: body.totalDonation,
        monthlyDonation: body.monthlyDonation,
      },
      create: {
        id: 'main',
        totalDonation: body.totalDonation,
        monthlyDonation: body.monthlyDonation,
      },
    });

    return new Response(JSON.stringify(updated), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Update failed' }), {
      status: 500,
    });
  }
}
