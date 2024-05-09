-- DropForeignKey
ALTER TABLE "BillingSlip" DROP CONSTRAINT "BillingSlip_vehicleNumber_fkey";

-- DropForeignKey
ALTER TABLE "LandfillEntry" DROP CONSTRAINT "LandfillEntry_landfillId_fkey";

-- DropForeignKey
ALTER TABLE "LandfillEntry" DROP CONSTRAINT "LandfillEntry_vehicleId_fkey";

-- DropForeignKey
ALTER TABLE "STSEntry" DROP CONSTRAINT "STSEntry_stsId_fkey";

-- DropForeignKey
ALTER TABLE "STSEntry" DROP CONSTRAINT "STSEntry_vehicleId_fkey";

-- DropForeignKey
ALTER TABLE "TodaysFleet" DROP CONSTRAINT "TodaysFleet_stsId_fkey";

-- AlterTable
ALTER TABLE "BillingSlip" ALTER COLUMN "vehicleNumber" DROP DEFAULT;

-- AlterTable
ALTER TABLE "LandfillEntry" ALTER COLUMN "landfillId" DROP DEFAULT,
ALTER COLUMN "vehicleId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "STSEntry" ALTER COLUMN "stsId" DROP DEFAULT,
ALTER COLUMN "vehicleId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "TodaysFleet" ALTER COLUMN "stsId" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "STSEntry" ADD CONSTRAINT "STSEntry_stsId_fkey" FOREIGN KEY ("stsId") REFERENCES "STS"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "STSEntry" ADD CONSTRAINT "STSEntry_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LandfillEntry" ADD CONSTRAINT "LandfillEntry_landfillId_fkey" FOREIGN KEY ("landfillId") REFERENCES "Landfill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LandfillEntry" ADD CONSTRAINT "LandfillEntry_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TodaysFleet" ADD CONSTRAINT "TodaysFleet_stsId_fkey" FOREIGN KEY ("stsId") REFERENCES "STS"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BillingSlip" ADD CONSTRAINT "BillingSlip_vehicleNumber_fkey" FOREIGN KEY ("vehicleNumber") REFERENCES "Vehicle"("vehicleNumber") ON DELETE CASCADE ON UPDATE CASCADE;
