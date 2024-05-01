-- AlterTable
ALTER TABLE "User" ADD COLUMN     "landfillId" TEXT;

-- CreateTable
CREATE TABLE "Landfill" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "capacity" DECIMAL(65,30) NOT NULL,
    "operationalTimespan" TEXT NOT NULL,

    CONSTRAINT "Landfill_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_landfillId_fkey" FOREIGN KEY ("landfillId") REFERENCES "Landfill"("id") ON DELETE SET NULL ON UPDATE CASCADE;
