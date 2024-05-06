/*
  Warnings:

  - A unique constraint covering the columns `[date,stsId]` on the table `TodaysFleet` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TodaysFleet_date_stsId_key" ON "TodaysFleet"("date", "stsId");
