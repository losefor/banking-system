/*
  Warnings:

  - The values [CUREENT] on the enum `AccountType` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `type` to the `ConfirmedTransactoin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `PendingTransactoin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('WITHDRAWAL', 'DEPOSIT');

-- AlterEnum
BEGIN;
CREATE TYPE "AccountType_new" AS ENUM ('CURRENT', 'SAVING');
ALTER TABLE "Account" ALTER COLUMN "account_type" TYPE "AccountType_new" USING ("account_type"::text::"AccountType_new");
ALTER TYPE "AccountType" RENAME TO "AccountType_old";
ALTER TYPE "AccountType_new" RENAME TO "AccountType";
DROP TYPE "AccountType_old";
COMMIT;

-- AlterTable
ALTER TABLE "ConfirmedTransactoin" ADD COLUMN     "type" "TransactionType" NOT NULL;

-- AlterTable
ALTER TABLE "PendingTransactoin" ADD COLUMN     "type" "TransactionType" NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "address" TEXT NOT NULL;
