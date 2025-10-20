/*
  Warnings:

  - Added the required column `finalPrice` to the `agency_bill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vat` to the `agency_bill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wholesalePrice` to the `agency_orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."agency_bill" ADD COLUMN     "finalPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "vat" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."agency_orders" ADD COLUMN     "wholesalePrice" DOUBLE PRECISION NOT NULL;
