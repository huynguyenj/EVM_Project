/*
  Warnings:

  - You are about to alter the column `address` on the `customers` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(300)`.
  - You are about to alter the column `email` on the `customers` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(250)`.

*/
-- AlterTable
ALTER TABLE "public"."customers" ALTER COLUMN "address" SET DATA TYPE VARCHAR(300),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(250),
ALTER COLUMN "credentialId" SET DATA TYPE VARCHAR(250);
