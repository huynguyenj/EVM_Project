/*
  Warnings:

  - You are about to drop the `Agency_Debt` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Agency_Paid_Process` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `transfer_contract` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."AgencyOrderStatus" AS ENUM ('PENDING', 'APPROVED', 'DELIVERED', 'PAID', 'CANCELED');

-- CreateEnum
CREATE TYPE "public"."AgencyBillType" AS ENUM ('FULL', 'DEFERRED');

-- DropForeignKey
ALTER TABLE "public"."Agency_Debt" DROP CONSTRAINT "Agency_Debt_transferContractId_fkey";

-- DropForeignKey
ALTER TABLE "public"."transfer_contract" DROP CONSTRAINT "transfer_contract_agencyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."transfer_contract" DROP CONSTRAINT "transfer_contract_electricMotorbikeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."transfer_contract" DROP CONSTRAINT "transfer_contract_warehouseId_fkey";

-- DropTable
DROP TABLE "public"."Agency_Debt";

-- DropTable
DROP TABLE "public"."Agency_Paid_Process";

-- DropTable
DROP TABLE "public"."transfer_contract";

-- DropEnum
DROP TYPE "public"."TransferContractStatus";

-- CreateTable
CREATE TABLE "public"."agency_orders" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "status" "public"."AgencyOrderStatus" NOT NULL,
    "orderAt" DATE NOT NULL,
    "basePrice" DOUBLE PRECISION NOT NULL,
    "finalPrice" DOUBLE PRECISION NOT NULL,
    "agencyId" INTEGER NOT NULL,
    "warehouseId" INTEGER NOT NULL,
    "electricMotorbikeId" INTEGER NOT NULL,
    "pricePolicyId" INTEGER NOT NULL,
    "discountId" INTEGER,
    "promotionId" INTEGER,

    CONSTRAINT "agency_orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."agency_bill" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "createAt" DATE NOT NULL,
    "updateAt" DATE NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "type" "public"."AgencyBillType" NOT NULL,
    "agencyOrderId" INTEGER NOT NULL,

    CONSTRAINT "agency_bill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."agency_payment" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "paidAt" DATE NOT NULL,
    "agencyBillId" INTEGER NOT NULL,

    CONSTRAINT "agency_payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "agency_bill_agencyOrderId_key" ON "public"."agency_bill"("agencyOrderId");

-- CreateIndex
CREATE UNIQUE INDEX "agency_payment_agencyBillId_key" ON "public"."agency_payment"("agencyBillId");

-- AddForeignKey
ALTER TABLE "public"."agency_orders" ADD CONSTRAINT "agency_orders_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "public"."agencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."agency_orders" ADD CONSTRAINT "agency_orders_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "public"."warehouses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."agency_orders" ADD CONSTRAINT "agency_orders_electricMotorbikeId_fkey" FOREIGN KEY ("electricMotorbikeId") REFERENCES "public"."electric_motorbikes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."agency_orders" ADD CONSTRAINT "agency_orders_pricePolicyId_fkey" FOREIGN KEY ("pricePolicyId") REFERENCES "public"."price_policy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."agency_orders" ADD CONSTRAINT "agency_orders_discountId_fkey" FOREIGN KEY ("discountId") REFERENCES "public"."discount_policy"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."agency_orders" ADD CONSTRAINT "agency_orders_promotionId_fkey" FOREIGN KEY ("promotionId") REFERENCES "public"."promotions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."agency_bill" ADD CONSTRAINT "agency_bill_agencyOrderId_fkey" FOREIGN KEY ("agencyOrderId") REFERENCES "public"."agency_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."agency_payment" ADD CONSTRAINT "agency_payment_agencyBillId_fkey" FOREIGN KEY ("agencyBillId") REFERENCES "public"."agency_bill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
