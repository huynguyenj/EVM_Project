/*
  Warnings:

  - You are about to drop the column `agencyId` on the `promotions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."promotions" DROP CONSTRAINT "promotions_agencyId_fkey";

-- AlterTable
ALTER TABLE "public"."promotions" DROP COLUMN "agencyId";
