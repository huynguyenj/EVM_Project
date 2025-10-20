/*
  Warnings:

  - Added the required column `finalAmount` to the `customer_contracts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."customer_contracts" ADD COLUMN     "finalAmount" DOUBLE PRECISION NOT NULL;
