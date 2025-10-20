/*
  Warnings:

  - A unique constraint covering the columns `[credentialId,email,agencyId]` on the table `customers` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."customers_credentialId_key";

-- DropIndex
DROP INDEX "public"."customers_email_key";

-- CreateIndex
CREATE UNIQUE INDEX "customers_credentialId_email_agencyId_key" ON "public"."customers"("credentialId", "email", "agencyId");
