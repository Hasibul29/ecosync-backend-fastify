/*
  Warnings:

  - Made the column `stsId` on table `STSEntry` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "LandfillEntry" DROP CONSTRAINT "LandfillEntry_landfillId_fkey";

-- DropForeignKey
ALTER TABLE "LandfillEntry" DROP CONSTRAINT "LandfillEntry_vehicleId_fkey";

-- DropForeignKey
ALTER TABLE "OTP" DROP CONSTRAINT "OTP_userId_fkey";

-- DropForeignKey
ALTER TABLE "STSEntry" DROP CONSTRAINT "STSEntry_stsId_fkey";

-- DropForeignKey
ALTER TABLE "STSEntry" DROP CONSTRAINT "STSEntry_vehicleId_fkey";

-- DropForeignKey
ALTER TABLE "TodaysFleet" DROP CONSTRAINT "TodaysFleet_stsId_fkey";

-- AlterTable
ALTER TABLE "LandfillEntry" ALTER COLUMN "landfillId" SET DEFAULT 'Deleted',
ALTER COLUMN "vehicleId" SET DEFAULT 'Deleted';

-- AlterTable
ALTER TABLE "STSEntry" ALTER COLUMN "stsId" SET NOT NULL,
ALTER COLUMN "stsId" SET DEFAULT 'Deleted',
ALTER COLUMN "vehicleId" SET DEFAULT 'Deleted';

-- AlterTable
ALTER TABLE "TodaysFleet" ALTER COLUMN "stsId" SET DEFAULT 'Deleted';

-- AddForeignKey
ALTER TABLE "OTP" ADD CONSTRAINT "OTP_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Auth"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "STSEntry" ADD CONSTRAINT "STSEntry_stsId_fkey" FOREIGN KEY ("stsId") REFERENCES "STS"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "STSEntry" ADD CONSTRAINT "STSEntry_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LandfillEntry" ADD CONSTRAINT "LandfillEntry_landfillId_fkey" FOREIGN KEY ("landfillId") REFERENCES "Landfill"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LandfillEntry" ADD CONSTRAINT "LandfillEntry_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TodaysFleet" ADD CONSTRAINT "TodaysFleet_stsId_fkey" FOREIGN KEY ("stsId") REFERENCES "STS"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;
