/*
  Warnings:

  - You are about to drop the column `finalPrice` on the `agency_bill` table. All the data in the column will be lost.
  - You are about to drop the column `vat` on the `agency_bill` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."agency_bill" DROP COLUMN "finalPrice",
DROP COLUMN "vat";
