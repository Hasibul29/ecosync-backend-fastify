/*
  Warnings:

  - You are about to drop the column `todaysFleetId` on the `Vehicle` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Vehicle" DROP CONSTRAINT "Vehicle_todaysFleetId_fkey";

-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "todaysFleetId";

-- CreateTable
CREATE TABLE "_TodaysFleetToVehicle" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TodaysFleetToVehicle_AB_unique" ON "_TodaysFleetToVehicle"("A", "B");

-- CreateIndex
CREATE INDEX "_TodaysFleetToVehicle_B_index" ON "_TodaysFleetToVehicle"("B");

-- AddForeignKey
ALTER TABLE "_TodaysFleetToVehicle" ADD CONSTRAINT "_TodaysFleetToVehicle_A_fkey" FOREIGN KEY ("A") REFERENCES "TodaysFleet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TodaysFleetToVehicle" ADD CONSTRAINT "_TodaysFleetToVehicle_B_fkey" FOREIGN KEY ("B") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
