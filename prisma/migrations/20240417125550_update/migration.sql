/*
  Warnings:

  - You are about to drop the column `salt` on the `Auth` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Auth" DROP COLUMN "salt";
