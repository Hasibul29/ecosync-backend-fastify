/*
  Warnings:

  - Added the required column `wayPoints` to the `TravelRoute` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TravelRoute" ADD COLUMN     "wayPoints" JSONB NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;
