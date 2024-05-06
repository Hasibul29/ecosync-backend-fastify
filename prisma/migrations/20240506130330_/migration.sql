-- DropForeignKey
ALTER TABLE "STSEntry" DROP CONSTRAINT "STSEntry_stsId_fkey";

-- AddForeignKey
ALTER TABLE "STSEntry" ADD CONSTRAINT "STSEntry_stsId_fkey" FOREIGN KEY ("stsId") REFERENCES "STS"("id") ON DELETE CASCADE ON UPDATE CASCADE;
