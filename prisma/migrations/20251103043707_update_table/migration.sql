/*
  Warnings:

  - You are about to drop the column `warehouseId` on the `agency_orders` table. All the data in the column will be lost.
  - Added the required column `warehouseId` to the `order_items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."agency_orders" DROP CONSTRAINT "agency_orders_warehouseId_fkey";

-- AlterTable
ALTER TABLE "public"."agency_orders" DROP COLUMN "warehouseId";

-- AlterTable
ALTER TABLE "public"."order_items" ADD COLUMN     "warehouseId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."order_items" ADD CONSTRAINT "order_items_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "public"."warehouses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
