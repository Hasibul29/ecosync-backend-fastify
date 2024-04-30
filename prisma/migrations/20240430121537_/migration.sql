-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_stsId_fkey";

-- DropForeignKey
ALTER TABLE "Vehicle" DROP CONSTRAINT "Vehicle_stsId_fkey";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_stsId_fkey" FOREIGN KEY ("stsId") REFERENCES "STS"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_stsId_fkey" FOREIGN KEY ("stsId") REFERENCES "STS"("id") ON DELETE SET NULL ON UPDATE CASCADE;
