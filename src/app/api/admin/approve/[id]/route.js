import { prisma } from '@/lib/prisma';

export async function POST(req, { params }) {
  const { id } = params;
  const { amount } = await req.json();

  await prisma.donor.update({
    where: { id },
    data: {
      status: 'paid',
      note: `Amount: ${amount}`,
    },
  });

  return new Response(JSON.stringify({ message: 'Approved' }));
}
