-- AlterTable
ALTER TABLE "users" ADD COLUMN     "bankId" TEXT;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_bankId_fkey" FOREIGN KEY ("bankId") REFERENCES "Bank"("id") ON DELETE SET NULL ON UPDATE CASCADE;
