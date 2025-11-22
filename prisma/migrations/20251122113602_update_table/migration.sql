/*
  Warnings:

  - You are about to drop the column `dueDate` on the `agency_orders` table. All the data in the column will be lost.
  - You are about to drop the column `partialAmount` on the `agency_orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."agency_orders" DROP COLUMN "dueDate",
DROP COLUMN "partialAmount";
