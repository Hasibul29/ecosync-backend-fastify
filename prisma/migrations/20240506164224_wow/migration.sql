/*
  Warnings:

  - Added the required column `distace` to the `TravelRoute` table without a default value. This is not possible if the table is not empty.
  - Added the required column `routeList` to the `TravelRoute` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `TravelRoute` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BillingSlip" DROP CONSTRAINT "BillingSlip_vehicleNumber_fkey";

-- AlterTable
ALTER TABLE "BillingSlip" ALTER COLUMN "vehicleNumber" SET DEFAULT 'Deleted';

-- AlterTable
ALTER TABLE "TravelRoute" ADD COLUMN     "distace" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "routeList" JSONB NOT NULL,
ADD COLUMN     "time" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "_STSToTravelRoute" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_LandfillToTravelRoute" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_TravelRouteToVehicle" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_STSToTravelRoute_AB_unique" ON "_STSToTravelRoute"("A", "B");

-- CreateIndex
CREATE INDEX "_STSToTravelRoute_B_index" ON "_STSToTravelRoute"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LandfillToTravelRoute_AB_unique" ON "_LandfillToTravelRoute"("A", "B");

-- CreateIndex
CREATE INDEX "_LandfillToTravelRoute_B_index" ON "_LandfillToTravelRoute"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TravelRouteToVehicle_AB_unique" ON "_TravelRouteToVehicle"("A", "B");

-- CreateIndex
CREATE INDEX "_TravelRouteToVehicle_B_index" ON "_TravelRouteToVehicle"("B");

-- AddForeignKey
ALTER TABLE "BillingSlip" ADD CONSTRAINT "BillingSlip_vehicleNumber_fkey" FOREIGN KEY ("vehicleNumber") REFERENCES "Vehicle"("vehicleNumber") ON DELETE SET DEFAULT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_STSToTravelRoute" ADD CONSTRAINT "_STSToTravelRoute_A_fkey" FOREIGN KEY ("A") REFERENCES "STS"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_STSToTravelRoute" ADD CONSTRAINT "_STSToTravelRoute_B_fkey" FOREIGN KEY ("B") REFERENCES "TravelRoute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LandfillToTravelRoute" ADD CONSTRAINT "_LandfillToTravelRoute_A_fkey" FOREIGN KEY ("A") REFERENCES "Landfill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LandfillToTravelRoute" ADD CONSTRAINT "_LandfillToTravelRoute_B_fkey" FOREIGN KEY ("B") REFERENCES "TravelRoute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TravelRouteToVehicle" ADD CONSTRAINT "_TravelRouteToVehicle_A_fkey" FOREIGN KEY ("A") REFERENCES "TravelRoute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TravelRouteToVehicle" ADD CONSTRAINT "_TravelRouteToVehicle_B_fkey" FOREIGN KEY ("B") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
