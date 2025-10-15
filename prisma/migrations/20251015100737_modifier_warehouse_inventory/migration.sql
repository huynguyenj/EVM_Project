/*
  Warnings:

  - You are about to drop the `Inventory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Warehouse` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Inventory" DROP CONSTRAINT "Inventory_electricMotorbikeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Inventory" DROP CONSTRAINT "Inventory_warehouseId_fkey";

-- DropForeignKey
ALTER TABLE "public"."transfer_contract" DROP CONSTRAINT "transfer_contract_warehouseId_fkey";

-- DropTable
DROP TABLE "public"."Inventory";

-- DropTable
DROP TABLE "public"."Warehouse";

-- CreateTable
CREATE TABLE "public"."warehouses" (
    "id" SERIAL NOT NULL,
    "location" VARCHAR(200) NOT NULL,
    "address" VARCHAR(300) NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "warehouses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."inventory" (
    "electricMotorbikeId" INTEGER NOT NULL,
    "warehouseId" INTEGER NOT NULL,
    "quantity" BIGINT NOT NULL,
    "stockDate" DATE NOT NULL,
    "lastUpdate" DATE NOT NULL,

    CONSTRAINT "inventory_pkey" PRIMARY KEY ("electricMotorbikeId","warehouseId")
);

-- AddForeignKey
ALTER TABLE "public"."transfer_contract" ADD CONSTRAINT "transfer_contract_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "public"."warehouses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."inventory" ADD CONSTRAINT "inventory_electricMotorbikeId_fkey" FOREIGN KEY ("electricMotorbikeId") REFERENCES "public"."electric_motorbikes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."inventory" ADD CONSTRAINT "inventory_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "public"."warehouses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
