/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Notice` table. All the data in the column will be lost.
  - You are about to drop the column `message` on the `Notice` table. All the data in the column will be lost.
  - You are about to drop the `Stat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `date` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `Notice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Member" DROP COLUMN "createdAt",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'active';

-- AlterTable
ALTER TABLE "Notice" DROP COLUMN "createdAt",
DROP COLUMN "message",
ADD COLUMN     "content" TEXT NOT NULL,
ALTER COLUMN "id" SET DEFAULT 'main';

-- DropTable
DROP TABLE "Stat";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "DonationMeta" (
    "id" TEXT NOT NULL DEFAULT 'main',
    "totalDonation" INTEGER NOT NULL,
    "monthlyDonation" INTEGER NOT NULL,

    CONSTRAINT "DonationMeta_pkey" PRIMARY KEY ("id")
);
