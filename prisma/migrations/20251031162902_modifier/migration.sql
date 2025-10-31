/*
  Warnings:

  - You are about to drop the `agency_payment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."agency_payment" DROP CONSTRAINT "agency_payment_agencyBillId_fkey";

-- AlterTable
ALTER TABLE "public"."agency_bill" ADD COLUMN     "paidAt" DATE;

-- DropTable
DROP TABLE "public"."agency_payment";
