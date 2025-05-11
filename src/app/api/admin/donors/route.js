import { prisma } from '@/lib/prisma';

export async function GET() {
  const donors = await prisma.donor.findMany({
    orderBy: { createdAt: 'desc' }
  });
  return Response.json(donors);
}
