/*
  Warnings:

  - A unique constraint covering the columns `[wardNo]` on the table `STS` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `STS` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_roleId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_stsId_fkey";

-- DropForeignKey
ALTER TABLE "Vehicle" DROP CONSTRAINT "Vehicle_stsId_fkey";

-- AlterTable
ALTER TABLE "STS" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "STS_wardNo_key" ON "STS"("wardNo");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_stsId_fkey" FOREIGN KEY ("stsId") REFERENCES "STS"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_stsId_fkey" FOREIGN KEY ("stsId") REFERENCES "STS"("id") ON DELETE CASCADE ON UPDATE CASCADE;
