/*
  Warnings:

  - You are about to drop the column `basePrice` on the `agency_orders` table. All the data in the column will be lost.
  - You are about to drop the column `colorId` on the `agency_orders` table. All the data in the column will be lost.
  - You are about to drop the column `discountId` on the `agency_orders` table. All the data in the column will be lost.
  - You are about to drop the column `discountTotal` on the `agency_orders` table. All the data in the column will be lost.
  - You are about to drop the column `electricMotorbikeId` on the `agency_orders` table. All the data in the column will be lost.
  - You are about to drop the column `finalPrice` on the `agency_orders` table. All the data in the column will be lost.
  - You are about to drop the column `pricePolicyId` on the `agency_orders` table. All the data in the column will be lost.
  - You are about to drop the column `promotionId` on the `agency_orders` table. All the data in the column will be lost.
  - You are about to drop the column `promotionTotal` on the `agency_orders` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `agency_orders` table. All the data in the column will be lost.
  - You are about to drop the column `wholesalePrice` on the `agency_orders` table. All the data in the column will be lost.
  - Added the required column `creditChecked` to the `agency_orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemQuantity` to the `agency_orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderType` to the `agency_orders` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."AgencyOrderType" AS ENUM ('FULL', 'DRAFT');

-- CreateEnum
CREATE TYPE "public"."Ap_BatchesStatus" AS ENUM ('OPEN', 'PARTIAL', 'CLOSED', 'OVERDUE');

-- DropForeignKey
ALTER TABLE "public"."agency_orders" DROP CONSTRAINT "agency_orders_colorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."agency_orders" DROP CONSTRAINT "agency_orders_discountId_fkey";

-- DropForeignKey
ALTER TABLE "public"."agency_orders" DROP CONSTRAINT "agency_orders_electricMotorbikeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."agency_orders" DROP CONSTRAINT "agency_orders_pricePolicyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."agency_orders" DROP CONSTRAINT "agency_orders_promotionId_fkey";

-- AlterTable
ALTER TABLE "public"."agency_orders" DROP COLUMN "basePrice",
DROP COLUMN "colorId",
DROP COLUMN "discountId",
DROP COLUMN "discountTotal",
DROP COLUMN "electricMotorbikeId",
DROP COLUMN "finalPrice",
DROP COLUMN "pricePolicyId",
DROP COLUMN "promotionId",
DROP COLUMN "promotionTotal",
DROP COLUMN "quantity",
DROP COLUMN "wholesalePrice",
ADD COLUMN     "creditChecked" BOOLEAN NOT NULL,
ADD COLUMN     "itemQuantity" INTEGER NOT NULL,
ADD COLUMN     "orderType" "public"."AgencyOrderType" NOT NULL;

-- CreateTable
CREATE TABLE "public"."Credit_Line" (
    "id" SERIAL NOT NULL,
    "creditLimit" DOUBLE PRECISION NOT NULL,
    "warningThreshold" INTEGER NOT NULL,
    "overDueThreshHoldDays" INTEGER NOT NULL,
    "isBlocked" BOOLEAN NOT NULL DEFAULT false,
    "agencyId" INTEGER NOT NULL,

    CONSTRAINT "Credit_Line_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."order_items" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "basePrice" DOUBLE PRECISION NOT NULL,
    "wholesalePrice" DOUBLE PRECISION NOT NULL,
    "discountTotal" DOUBLE PRECISION NOT NULL,
    "promotionTotal" DOUBLE PRECISION NOT NULL,
    "finalPrice" DOUBLE PRECISION NOT NULL,
    "orderId" INTEGER NOT NULL,
    "electricMotorbikeId" INTEGER NOT NULL,
    "pricePolicyId" INTEGER NOT NULL,
    "discountId" INTEGER,
    "promotionId" INTEGER,
    "colorId" INTEGER NOT NULL,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Ap_Batches" (
    "id" SERIAL NOT NULL,
    "invoiceNumber" DOUBLE PRECISION NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "dueDate" DATE NOT NULL,
    "status" "public"."Ap_BatchesStatus" NOT NULL,
    "createAt" DATE NOT NULL,
    "agencyId" INTEGER NOT NULL,
    "agencyOrderId" INTEGER NOT NULL,

    CONSTRAINT "Ap_Batches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Ap_Payments" (
    "id" SERIAL NOT NULL,
    "paidDate" DATE NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "apBatchesId" INTEGER NOT NULL,

    CONSTRAINT "Ap_Payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Credit_Line_agencyId_key" ON "public"."Credit_Line"("agencyId");

-- AddForeignKey
ALTER TABLE "public"."Credit_Line" ADD CONSTRAINT "Credit_Line_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "public"."agencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order_items" ADD CONSTRAINT "order_items_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."agency_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order_items" ADD CONSTRAINT "order_items_electricMotorbikeId_fkey" FOREIGN KEY ("electricMotorbikeId") REFERENCES "public"."electric_motorbikes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order_items" ADD CONSTRAINT "order_items_pricePolicyId_fkey" FOREIGN KEY ("pricePolicyId") REFERENCES "public"."price_policy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order_items" ADD CONSTRAINT "order_items_discountId_fkey" FOREIGN KEY ("discountId") REFERENCES "public"."discount_policy"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order_items" ADD CONSTRAINT "order_items_promotionId_fkey" FOREIGN KEY ("promotionId") REFERENCES "public"."promotions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order_items" ADD CONSTRAINT "order_items_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "public"."colors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Ap_Batches" ADD CONSTRAINT "Ap_Batches_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "public"."agencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Ap_Batches" ADD CONSTRAINT "Ap_Batches_agencyOrderId_fkey" FOREIGN KEY ("agencyOrderId") REFERENCES "public"."agency_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Ap_Payments" ADD CONSTRAINT "Ap_Payments_apBatchesId_fkey" FOREIGN KEY ("apBatchesId") REFERENCES "public"."Ap_Batches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
