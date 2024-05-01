-- AlterTable
ALTER TABLE "STSEntry" ADD COLUMN     "vehicleId" TEXT;

-- AddForeignKey
ALTER TABLE "STSEntry" ADD CONSTRAINT "STSEntry_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE SET NULL ON UPDATE CASCADE;
