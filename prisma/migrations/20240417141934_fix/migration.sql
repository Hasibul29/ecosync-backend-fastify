-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_passwordId_fkey";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_passwordId_fkey" FOREIGN KEY ("passwordId") REFERENCES "Auth"("id") ON DELETE CASCADE ON UPDATE CASCADE;
