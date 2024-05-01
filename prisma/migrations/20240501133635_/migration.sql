/*
  Warnings:

  - Added the required column `landfillId` to the `LandfillEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vehicleId` to the `LandfillEntry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LandfillEntry" ADD COLUMN     "landfillId" TEXT NOT NULL,
ADD COLUMN     "vehicleId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "LandfillEntry" ADD CONSTRAINT "LandfillEntry_landfillId_fkey" FOREIGN KEY ("landfillId") REFERENCES "Landfill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LandfillEntry" ADD CONSTRAINT "LandfillEntry_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
