/*
  Warnings:

  - Added the required column `discountTotal` to the `agency_orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `promotionTotal` to the `agency_orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtotal` to the `agency_orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."agency_orders" ADD COLUMN     "discountTotal" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "promotionTotal" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "subtotal" DOUBLE PRECISION NOT NULL;
