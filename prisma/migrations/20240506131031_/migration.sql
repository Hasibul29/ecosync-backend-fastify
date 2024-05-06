-- DropForeignKey
ALTER TABLE "STSEntry" DROP CONSTRAINT "STSEntry_stsId_fkey";

-- AlterTable
ALTER TABLE "STSEntry" ALTER COLUMN "stsId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "STSEntry" ADD CONSTRAINT "STSEntry_stsId_fkey" FOREIGN KEY ("stsId") REFERENCES "STS"("id") ON DELETE SET NULL ON UPDATE CASCADE;