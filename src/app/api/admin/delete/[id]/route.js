import { prisma } from '@/lib/prisma';

export async function DELETE(_, { params }) {
  const { id } = params;

  await prisma.donor.delete({ where: { id } });
  return new Response(null, { status: 204 });
}
