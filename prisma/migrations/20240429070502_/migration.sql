-- DropForeignKey
ALTER TABLE "Vehicle" DROP CONSTRAINT "Vehicle_stsId_fkey";

-- AlterTable
ALTER TABLE "Vehicle" ALTER COLUMN "stsId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_stsId_fkey" FOREIGN KEY ("stsId") REFERENCES "STS"("id") ON DELETE SET NULL ON UPDATE CASCADE;
