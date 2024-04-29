-- AlterTable
ALTER TABLE "Vehicle" ADD COLUMN     "onService" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "STS" (
    "id" TEXT NOT NULL,
    "wardNo" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "capacity" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "STS_pkey" PRIMARY KEY ("id")
);
