/*
  Warnings:

  - Added the required column `colorId` to the `agency_orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."agency_orders" ADD COLUMN     "colorId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."agency_orders" ADD CONSTRAINT "agency_orders_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "public"."colors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
