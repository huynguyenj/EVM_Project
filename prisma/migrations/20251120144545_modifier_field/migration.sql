/*
  Warnings:

  - The primary key for the `inventory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Made the column `colorId` on table `inventory` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."inventory" DROP CONSTRAINT "inventory_colorId_fkey";

-- AlterTable
ALTER TABLE "public"."inventory" DROP CONSTRAINT "inventory_pkey",
ALTER COLUMN "colorId" SET NOT NULL,
ADD CONSTRAINT "inventory_pkey" PRIMARY KEY ("electricMotorbikeId", "warehouseId", "colorId");

-- AddForeignKey
ALTER TABLE "public"."inventory" ADD CONSTRAINT "inventory_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "public"."colors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
