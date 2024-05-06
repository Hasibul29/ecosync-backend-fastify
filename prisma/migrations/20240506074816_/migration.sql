/*
  Warnings:

  - You are about to alter the column `capacity` on the `Landfill` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `wasteVolume` on the `LandfillEntry` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `capacity` on the `STS` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `wasteVolume` on the `STSEntry` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `capacity` on the `Vehicle` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `fuelCostLoaded` on the `Vehicle` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `fuelCostUnloaded` on the `Vehicle` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Landfill" ALTER COLUMN "capacity" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "LandfillEntry" ALTER COLUMN "wasteVolume" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "STS" ALTER COLUMN "capacity" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "STSEntry" ALTER COLUMN "wasteVolume" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Vehicle" ADD COLUMN     "todaysFleetId" TEXT,
ALTER COLUMN "capacity" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "fuelCostLoaded" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "fuelCostUnloaded" SET DATA TYPE DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "TodaysFleet" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stsId" TEXT NOT NULL,

    CONSTRAINT "TodaysFleet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_todaysFleetId_fkey" FOREIGN KEY ("todaysFleetId") REFERENCES "TodaysFleet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TodaysFleet" ADD CONSTRAINT "TodaysFleet_stsId_fkey" FOREIGN KEY ("stsId") REFERENCES "STS"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
