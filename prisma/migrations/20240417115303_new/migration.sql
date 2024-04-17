-- CreateTable
CREATE TABLE "Auth" (
    "passwordHash" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Auth_userEmail_key" ON "Auth"("userEmail");

-- AddForeignKey
ALTER TABLE "Auth" ADD CONSTRAINT "Auth_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
