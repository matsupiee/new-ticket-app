-- CreateEnum
CREATE TYPE "BankAccountType" AS ENUM ('SAVINGS', 'CHECKING');

-- CreateTable
CREATE TABLE "BankAccount" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "eventOrganizerId" TEXT NOT NULL,
    "bankCode" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "branchCode" TEXT NOT NULL,
    "branchName" TEXT NOT NULL,
    "accountType" "BankAccountType" NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "accountHolder" TEXT NOT NULL,

    CONSTRAINT "BankAccount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BankAccount_bankCode_branchCode_accountNumber_key" ON "BankAccount"("bankCode", "branchCode", "accountNumber");

-- AddForeignKey
ALTER TABLE "BankAccount" ADD CONSTRAINT "BankAccount_eventOrganizerId_fkey" FOREIGN KEY ("eventOrganizerId") REFERENCES "EventOrganizer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
