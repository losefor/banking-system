/*
  Warnings:

  - You are about to drop the `ConfirmedTransactoin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PendingTransactoin` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ConfirmedTransactoin" DROP CONSTRAINT "ConfirmedTransactoin_from_account_id_fkey";

-- DropForeignKey
ALTER TABLE "ConfirmedTransactoin" DROP CONSTRAINT "ConfirmedTransactoin_to_account_id_fkey";

-- DropForeignKey
ALTER TABLE "PendingTransactoin" DROP CONSTRAINT "PendingTransactoin_fromAccountId_fkey";

-- DropForeignKey
ALTER TABLE "PendingTransactoin" DROP CONSTRAINT "PendingTransactoin_toAccountId_fkey";

-- DropTable
DROP TABLE "ConfirmedTransactoin";

-- DropTable
DROP TABLE "PendingTransactoin";

-- CreateTable
CREATE TABLE "PendingTransaction" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "type" "TransactionType" NOT NULL,
    "fromAccountId" TEXT NOT NULL,
    "toAccountId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PendingTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConfirmedTransaction" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "type" "TransactionType" NOT NULL,
    "from_account_id" TEXT NOT NULL,
    "to_account_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConfirmedTransaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PendingTransaction" ADD CONSTRAINT "PendingTransaction_fromAccountId_fkey" FOREIGN KEY ("fromAccountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PendingTransaction" ADD CONSTRAINT "PendingTransaction_toAccountId_fkey" FOREIGN KEY ("toAccountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConfirmedTransaction" ADD CONSTRAINT "ConfirmedTransaction_from_account_id_fkey" FOREIGN KEY ("from_account_id") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConfirmedTransaction" ADD CONSTRAINT "ConfirmedTransaction_to_account_id_fkey" FOREIGN KEY ("to_account_id") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
