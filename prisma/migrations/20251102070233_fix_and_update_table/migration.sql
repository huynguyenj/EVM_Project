/*
  Warnings:

  - You are about to drop the column `contractType` on the `customer_contracts` table. All the data in the column will be lost.
  - You are about to drop the column `createDate` on the `customer_contracts` table. All the data in the column will be lost.
  - You are about to drop the column `depositAmount` on the `customer_contracts` table. All the data in the column will be lost.
  - You are about to drop the column `finalAmount` on the `customer_contracts` table. All the data in the column will be lost.
  - You are about to drop the column `totalAmount` on the `customer_contracts` table. All the data in the column will be lost.
  - You are about to drop the `installment_payments` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[quotationId]` on the table `customer_contracts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `contractCode` to the `customer_contracts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `finalPrice` to the `customer_contracts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quotationId` to the `customer_contracts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `signDate` to the `customer_contracts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tensor` to the `installment_plans` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."QuotationStatus" AS ENUM ('DRAFT', 'ACCEPTED', 'REJECTED', 'EXPIRED', 'REVERSED');

-- CreateEnum
CREATE TYPE "public"."DepositStatus" AS ENUM ('PENDING', 'HOLDING', 'APPLIED', 'EXPIRED');

-- DropForeignKey
ALTER TABLE "public"."installment_payments" DROP CONSTRAINT "installment_payments_installmentContractId_fkey";

-- AlterTable
ALTER TABLE "public"."customer_contracts" DROP COLUMN "contractType",
DROP COLUMN "createDate",
DROP COLUMN "depositAmount",
DROP COLUMN "finalAmount",
DROP COLUMN "totalAmount",
ADD COLUMN     "contractCode" TEXT NOT NULL,
ADD COLUMN     "finalPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "quotationId" INTEGER NOT NULL,
ADD COLUMN     "signDate" DATE NOT NULL;

-- AlterTable
ALTER TABLE "public"."installment_plans" ADD COLUMN     "tensor" VARCHAR(100) NOT NULL;

-- DropTable
DROP TABLE "public"."installment_payments";

-- DropEnum
DROP TYPE "public"."CustomerContractType";

-- CreateTable
CREATE TABLE "public"."Contract_Document" (
    "id" SERIAL NOT NULL,
    "documentType" VARCHAR(200) NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "customerContractId" INTEGER NOT NULL,

    CONSTRAINT "Contract_Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Quotation" (
    "id" SERIAL NOT NULL,
    "quoteCode" TEXT NOT NULL,
    "createDate" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "basePrice" DOUBLE PRECISION NOT NULL,
    "promotionPrice" DOUBLE PRECISION,
    "finalPrice" DOUBLE PRECISION NOT NULL,
    "validUntil" DATE NOT NULL,
    "customerId" INTEGER NOT NULL,
    "dealerStaffId" INTEGER NOT NULL,
    "motorbikeId" INTEGER NOT NULL,
    "colorId" INTEGER NOT NULL,

    CONSTRAINT "Quotation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Deposit" (
    "id" SERIAL NOT NULL,
    "depositPercent" INTEGER NOT NULL,
    "depositAmount" DOUBLE PRECISION NOT NULL,
    "holdDays" DATE NOT NULL,
    "status" "public"."DepositStatus" NOT NULL,
    "quotationId" INTEGER NOT NULL,

    CONSTRAINT "Deposit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."installment_schedule" (
    "id" SERIAL NOT NULL,
    "dueDate" DATE NOT NULL,
    "paidDate" DATE,
    "amountDue" DOUBLE PRECISION NOT NULL,
    "amountPaid" DOUBLE PRECISION NOT NULL,
    "penaltyAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "status" "public"."InstallmentPaymentStatus" NOT NULL DEFAULT 'PENDING',
    "installmentContractId" INTEGER NOT NULL,

    CONSTRAINT "installment_schedule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Deposit_quotationId_key" ON "public"."Deposit"("quotationId");

-- CreateIndex
CREATE UNIQUE INDEX "customer_contracts_quotationId_key" ON "public"."customer_contracts"("quotationId");

-- AddForeignKey
ALTER TABLE "public"."customer_contracts" ADD CONSTRAINT "customer_contracts_quotationId_fkey" FOREIGN KEY ("quotationId") REFERENCES "public"."Quotation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Contract_Document" ADD CONSTRAINT "Contract_Document_customerContractId_fkey" FOREIGN KEY ("customerContractId") REFERENCES "public"."customer_contracts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Quotation" ADD CONSTRAINT "Quotation_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "public"."customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Quotation" ADD CONSTRAINT "Quotation_dealerStaffId_fkey" FOREIGN KEY ("dealerStaffId") REFERENCES "public"."staffs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Quotation" ADD CONSTRAINT "Quotation_motorbikeId_fkey" FOREIGN KEY ("motorbikeId") REFERENCES "public"."electric_motorbikes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Quotation" ADD CONSTRAINT "Quotation_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "public"."colors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Deposit" ADD CONSTRAINT "Deposit_quotationId_fkey" FOREIGN KEY ("quotationId") REFERENCES "public"."Quotation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."installment_schedule" ADD CONSTRAINT "installment_schedule_installmentContractId_fkey" FOREIGN KEY ("installmentContractId") REFERENCES "public"."installment_contracts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
