/*
  Warnings:

  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Customer_Debt` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Paid_Process` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Shipment` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."InstallmentStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "public"."InterestType" AS ENUM ('FLAT', 'DECLINING');

-- CreateEnum
CREATE TYPE "public"."CustomerContractPaidType" AS ENUM ('FULL', 'DEBT');

-- CreateEnum
CREATE TYPE "public"."CustomerContractType" AS ENUM ('PRE_ORDER', 'AT_STORE', 'ORDER');

-- CreateEnum
CREATE TYPE "public"."CustomerContractStatus" AS ENUM ('PENDING', 'CONFIRMED', 'PROCESSING', 'DELIVERED', 'COMPLETED', 'CANCELED');

-- CreateEnum
CREATE TYPE "public"."InstallmentContractStatus" AS ENUM ('ACTIVE', 'COMPLETED', 'OVERDUE');

-- CreateEnum
CREATE TYPE "public"."PenaltyType" AS ENUM ('DAILY', 'FIXED');

-- CreateEnum
CREATE TYPE "public"."InstallmentPaymentStatus" AS ENUM ('PENDING', 'LATE', 'PAID');

-- DropForeignKey
ALTER TABLE "public"."Customer_Debt" DROP CONSTRAINT "Customer_Debt_customerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Feedback" DROP CONSTRAINT "Feedback_customerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Order" DROP CONSTRAINT "Order_agencyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Order" DROP CONSTRAINT "Order_customerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Order" DROP CONSTRAINT "Order_electricMotorbikeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Order" DROP CONSTRAINT "Order_staffId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Paid_Process" DROP CONSTRAINT "Paid_Process_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Payment" DROP CONSTRAINT "Payment_orderId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Shipment" DROP CONSTRAINT "Shipment_orderId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Voucher" DROP CONSTRAINT "Voucher_customerId_fkey";

-- DropTable
DROP TABLE "public"."Customer";

-- DropTable
DROP TABLE "public"."Customer_Debt";

-- DropTable
DROP TABLE "public"."Order";

-- DropTable
DROP TABLE "public"."Paid_Process";

-- DropTable
DROP TABLE "public"."Payment";

-- DropTable
DROP TABLE "public"."Shipment";

-- DropEnum
DROP TYPE "public"."OrderType";

-- DropEnum
DROP TYPE "public"."PaymentMethod";

-- DropEnum
DROP TYPE "public"."PaymentStatus";

-- DropEnum
DROP TYPE "public"."ShipmentStatus";

-- CreateTable
CREATE TABLE "public"."installment_plans" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "interestRate" INTEGER NOT NULL,
    "interestRateTotalMonth" INTEGER NOT NULL,
    "totalPaidMonth" INTEGER NOT NULL,
    "interestPaidType" "public"."InterestType" NOT NULL,
    "prePaidPercent" INTEGER NOT NULL,
    "processFee" DOUBLE PRECISION NOT NULL,
    "startAt" DATE NOT NULL,
    "endAt" DATE NOT NULL,
    "status" "public"."InstallmentStatus" NOT NULL,
    "agencyId" INTEGER NOT NULL,

    CONSTRAINT "installment_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."customers" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "address" TEXT NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "email" TEXT NOT NULL,
    "credentialId" INTEGER NOT NULL,
    "dob" DATE NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Customer_Contract" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "content" TEXT NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "depositAmount" DOUBLE PRECISION NOT NULL,
    "createDate" DATE NOT NULL,
    "contractPaidType" "public"."CustomerContractPaidType" NOT NULL,
    "contractType" "public"."CustomerContractType" NOT NULL,
    "status" "public"."CustomerContractStatus" NOT NULL,
    "customerId" INTEGER NOT NULL,
    "staffId" INTEGER NOT NULL,
    "agencyId" INTEGER NOT NULL,
    "electricMotorbikeId" INTEGER NOT NULL,
    "colorId" INTEGER NOT NULL,

    CONSTRAINT "Customer_Contract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Installment_Contract" (
    "id" SERIAL NOT NULL,
    "startAt" DATE NOT NULL,
    "prePaidTotal" DOUBLE PRECISION NOT NULL,
    "paidBeforeInterestEachMonth" DOUBLE PRECISION NOT NULL,
    "paidWithInterestEachMonth" DOUBLE PRECISION NOT NULL,
    "totalDebtPaid" DOUBLE PRECISION NOT NULL,
    "penaltyValue" DOUBLE PRECISION NOT NULL,
    "penaltyType" "public"."PenaltyType" NOT NULL,
    "status" "public"."InstallmentContractStatus" NOT NULL,
    "customerId" INTEGER NOT NULL,
    "installmentPlanId" INTEGER NOT NULL,

    CONSTRAINT "Installment_Contract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."installment_payments" (
    "id" SERIAL NOT NULL,
    "dueDate" DATE NOT NULL,
    "paidDate" DATE NOT NULL,
    "amountDue" DOUBLE PRECISION NOT NULL,
    "amountPaid" DOUBLE PRECISION NOT NULL,
    "penaltyAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "status" "public"."InstallmentPaymentStatus" NOT NULL DEFAULT 'PENDING',
    "installmentContractId" INTEGER NOT NULL,

    CONSTRAINT "installment_payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_email_key" ON "public"."customers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "customers_credentialId_key" ON "public"."customers"("credentialId");

-- CreateIndex
CREATE UNIQUE INDEX "Installment_Contract_installmentPlanId_key" ON "public"."Installment_Contract"("installmentPlanId");

-- AddForeignKey
ALTER TABLE "public"."installment_plans" ADD CONSTRAINT "installment_plans_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "public"."agencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Customer_Contract" ADD CONSTRAINT "Customer_Contract_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "public"."customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Customer_Contract" ADD CONSTRAINT "Customer_Contract_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "public"."staffs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Customer_Contract" ADD CONSTRAINT "Customer_Contract_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "public"."agencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Customer_Contract" ADD CONSTRAINT "Customer_Contract_electricMotorbikeId_fkey" FOREIGN KEY ("electricMotorbikeId") REFERENCES "public"."electric_motorbikes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Customer_Contract" ADD CONSTRAINT "Customer_Contract_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "public"."colors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Installment_Contract" ADD CONSTRAINT "Installment_Contract_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "public"."customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Installment_Contract" ADD CONSTRAINT "Installment_Contract_installmentPlanId_fkey" FOREIGN KEY ("installmentPlanId") REFERENCES "public"."installment_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."installment_payments" ADD CONSTRAINT "installment_payments_installmentContractId_fkey" FOREIGN KEY ("installmentContractId") REFERENCES "public"."Installment_Contract"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Voucher" ADD CONSTRAINT "Voucher_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "public"."customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Feedback" ADD CONSTRAINT "Feedback_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "public"."customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
