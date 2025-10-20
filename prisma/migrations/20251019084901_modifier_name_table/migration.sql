/*
  Warnings:

  - You are about to drop the `Customer_Contract` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Installment_Contract` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Customer_Contract" DROP CONSTRAINT "Customer_Contract_agencyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Customer_Contract" DROP CONSTRAINT "Customer_Contract_colorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Customer_Contract" DROP CONSTRAINT "Customer_Contract_customerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Customer_Contract" DROP CONSTRAINT "Customer_Contract_electricMotorbikeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Customer_Contract" DROP CONSTRAINT "Customer_Contract_staffId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Installment_Contract" DROP CONSTRAINT "Installment_Contract_customerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Installment_Contract" DROP CONSTRAINT "Installment_Contract_installmentPlanId_fkey";

-- DropForeignKey
ALTER TABLE "public"."installment_payments" DROP CONSTRAINT "installment_payments_installmentContractId_fkey";

-- DropTable
DROP TABLE "public"."Customer_Contract";

-- DropTable
DROP TABLE "public"."Installment_Contract";

-- CreateTable
CREATE TABLE "public"."customer_contracts" (
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

    CONSTRAINT "customer_contracts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."installment_contracts" (
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

    CONSTRAINT "installment_contracts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "installment_contracts_installmentPlanId_key" ON "public"."installment_contracts"("installmentPlanId");

-- AddForeignKey
ALTER TABLE "public"."customer_contracts" ADD CONSTRAINT "customer_contracts_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "public"."customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."customer_contracts" ADD CONSTRAINT "customer_contracts_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "public"."staffs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."customer_contracts" ADD CONSTRAINT "customer_contracts_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "public"."agencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."customer_contracts" ADD CONSTRAINT "customer_contracts_electricMotorbikeId_fkey" FOREIGN KEY ("electricMotorbikeId") REFERENCES "public"."electric_motorbikes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."customer_contracts" ADD CONSTRAINT "customer_contracts_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "public"."colors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."installment_contracts" ADD CONSTRAINT "installment_contracts_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "public"."customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."installment_contracts" ADD CONSTRAINT "installment_contracts_installmentPlanId_fkey" FOREIGN KEY ("installmentPlanId") REFERENCES "public"."installment_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."installment_payments" ADD CONSTRAINT "installment_payments_installmentContractId_fkey" FOREIGN KEY ("installmentContractId") REFERENCES "public"."installment_contracts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
