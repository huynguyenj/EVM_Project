/*
  Warnings:

  - Added the required column `agencyId` to the `customers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."customers" ADD COLUMN     "agencyId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."customers" ADD CONSTRAINT "customers_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "public"."agencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
