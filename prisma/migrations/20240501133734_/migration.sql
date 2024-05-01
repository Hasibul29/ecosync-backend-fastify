/*
  Warnings:

  - Made the column `stsId` on table `STSEntry` required. This step will fail if there are existing NULL values in that column.
  - Made the column `vehicleId` on table `STSEntry` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "STSEntry" DROP CONSTRAINT "STSEntry_stsId_fkey";

-- DropForeignKey
ALTER TABLE "STSEntry" DROP CONSTRAINT "STSEntry_vehicleId_fkey";

-- AlterTable
ALTER TABLE "STSEntry" ALTER COLUMN "stsId" SET NOT NULL,
ALTER COLUMN "vehicleId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "STSEntry" ADD CONSTRAINT "STSEntry_stsId_fkey" FOREIGN KEY ("stsId") REFERENCES "STS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "STSEntry" ADD CONSTRAINT "STSEntry_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
