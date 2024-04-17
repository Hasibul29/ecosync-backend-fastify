/*
  Warnings:

  - You are about to drop the column `userEmail` on the `Auth` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[passwordId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `Auth` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `passwordId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Auth" DROP CONSTRAINT "Auth_userEmail_fkey";

-- DropIndex
DROP INDEX "Auth_userEmail_key";

-- AlterTable
ALTER TABLE "Auth" DROP COLUMN "userEmail",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Auth_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "passwordId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_passwordId_key" ON "User"("passwordId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_passwordId_fkey" FOREIGN KEY ("passwordId") REFERENCES "Auth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
