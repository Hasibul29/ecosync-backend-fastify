/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Auth` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Auth` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Landfill` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Landfill` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `LandfillEntry` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `LandfillEntry` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `OTP` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `OTP` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Permission` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Permission` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `STS` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `STS` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `STSEntry` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `STSEntry` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `TodaysFleet` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `TodaysFleet` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Vehicle` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Auth" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Landfill" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "LandfillEntry" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "OTP" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Permission" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "STS" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "STSEntry" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "TodaysFleet" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";
