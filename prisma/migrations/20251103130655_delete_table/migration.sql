/*
  Warnings:

  - You are about to drop the `agency_bill` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."agency_bill" DROP CONSTRAINT "agency_bill_agencyOrderId_fkey";

-- DropTable
DROP TABLE "public"."agency_bill";

-- DropEnum
DROP TYPE "public"."AgencyBillType";
