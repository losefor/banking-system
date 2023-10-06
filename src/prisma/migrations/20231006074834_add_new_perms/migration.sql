-- AlterTable
ALTER TABLE "permissions" ADD COLUMN     "Customer" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "Manager" TEXT NOT NULL DEFAULT '';
