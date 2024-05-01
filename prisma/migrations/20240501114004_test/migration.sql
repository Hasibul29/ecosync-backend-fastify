-- CreateTable
CREATE TABLE "STSEntry" (
    "id" TEXT NOT NULL,
    "stsId" TEXT,
    "wasteVolume" DECIMAL(65,30) NOT NULL,
    "arrivalTime" TIMESTAMP(3) NOT NULL,
    "departureTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "STSEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LandfillEntry" (
    "id" TEXT NOT NULL,
    "wasteVolume" DECIMAL(65,30) NOT NULL,
    "arrivalTime" TIMESTAMP(3) NOT NULL,
    "departureTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LandfillEntry_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "STSEntry" ADD CONSTRAINT "STSEntry_stsId_fkey" FOREIGN KEY ("stsId") REFERENCES "STS"("id") ON DELETE SET NULL ON UPDATE CASCADE;
