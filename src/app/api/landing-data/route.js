// app/api/landing-data/route.js
import { prisma } from '@/lib/prisma';

export async function GET() {
  const donors = await prisma.donor.findMany();
  const members = await prisma.member.findMany();
  const unpaidDonors = await prisma.unpaidDonor.findMany();
  const meta = await prisma.donationMeta.findUnique({ where: { id: 'main' } });

  return Response.json({
    donors,
    members,
    unpaidDonors,
    totalDonation: meta?.totalDonation || 0,
    monthlyDonation: meta?.monthlyDonation || 0
  });
}
