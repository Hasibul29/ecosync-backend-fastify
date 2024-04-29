/*
  Warnings:

  - You are about to drop the column `sTSId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_sTSId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "sTSId",
ADD COLUMN     "stsId" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_stsId_fkey" FOREIGN KEY ("stsId") REFERENCES "STS"("id") ON DELETE SET NULL ON UPDATE CASCADE;
