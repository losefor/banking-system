-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('CUREENT', 'SAVING');

-- CreateTable
CREATE TABLE "Bank" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Bank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "account_type" "AccountType" NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PendingTransactoin" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "fromAccountId" TEXT NOT NULL,
    "toAccountId" TEXT NOT NULL,

    CONSTRAINT "PendingTransactoin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConfirmedTransactoin" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "from_account_id" TEXT NOT NULL,
    "to_account_id" TEXT NOT NULL,

    CONSTRAINT "ConfirmedTransactoin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" TEXT,
    "password" TEXT,
    "email" TEXT,
    "permission_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permissions" (
    "id" TEXT NOT NULL,
    "name_id" TEXT NOT NULL,
    "unique_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "Image" TEXT NOT NULL DEFAULT '',
    "Account" TEXT NOT NULL DEFAULT '',
    "Bank" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images" (
    "id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "is_used" BOOLEAN NOT NULL DEFAULT false,
    "user_id" TEXT NOT NULL,
    "width" INTEGER,
    "hight" INTEGER,
    "size_in_bytes" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "translations" (
    "id" TEXT NOT NULL,
    "ar" TEXT,
    "en" TEXT,
    "ckb" TEXT,

    CONSTRAINT "translations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_unique_name_key" ON "permissions"("unique_name");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PendingTransactoin" ADD CONSTRAINT "PendingTransactoin_fromAccountId_fkey" FOREIGN KEY ("fromAccountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PendingTransactoin" ADD CONSTRAINT "PendingTransactoin_toAccountId_fkey" FOREIGN KEY ("toAccountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConfirmedTransactoin" ADD CONSTRAINT "ConfirmedTransactoin_from_account_id_fkey" FOREIGN KEY ("from_account_id") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConfirmedTransactoin" ADD CONSTRAINT "ConfirmedTransactoin_to_account_id_fkey" FOREIGN KEY ("to_account_id") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permissions" ADD CONSTRAINT "permissions_name_id_fkey" FOREIGN KEY ("name_id") REFERENCES "translations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
