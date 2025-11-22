/*
  Warnings:

  - You are about to drop the column `orderType` on the `agency_orders` table. All the data in the column will be lost.
  - Added the required column `note` to the `agency_orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."agency_orders" DROP COLUMN "orderType",
ADD COLUMN     "note" TEXT NOT NULL;

-- DropEnum
DROP TYPE "public"."AgencyOrderType";
