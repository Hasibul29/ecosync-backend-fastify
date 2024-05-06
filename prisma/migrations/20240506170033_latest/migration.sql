/*
  Warnings:

  - You are about to drop the column `distace` on the `TravelRoute` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `TravelRoute` table. All the data in the column will be lost.
  - Added the required column `createdAt` to the `TravelRoute` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalDistance` to the `TravelRoute` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalTime` to the `TravelRoute` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TravelRoute" DROP COLUMN "distace",
DROP COLUMN "time",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "totalDistance" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "totalTime" DOUBLE PRECISION NOT NULL;
