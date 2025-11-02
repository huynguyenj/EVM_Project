/*
  Warnings:

  - You are about to drop the `Contract_Document` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Deposit` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Quotation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Contract_Document" DROP CONSTRAINT "Contract_Document_customerContractId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Deposit" DROP CONSTRAINT "Deposit_quotationId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Quotation" DROP CONSTRAINT "Quotation_colorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Quotation" DROP CONSTRAINT "Quotation_customerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Quotation" DROP CONSTRAINT "Quotation_dealerStaffId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Quotation" DROP CONSTRAINT "Quotation_motorbikeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."customer_contracts" DROP CONSTRAINT "customer_contracts_quotationId_fkey";

-- DropTable
DROP TABLE "public"."Contract_Document";

-- DropTable
DROP TABLE "public"."Deposit";

-- DropTable
DROP TABLE "public"."Quotation";

-- CreateTable
CREATE TABLE "public"."contract_documents" (
    "id" SERIAL NOT NULL,
    "documentType" VARCHAR(200) NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "customerContractId" INTEGER NOT NULL,

    CONSTRAINT "contract_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."quotations" (
    "id" SERIAL NOT NULL,
    "quoteCode" TEXT NOT NULL,
    "createDate" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "public"."QuotationType" NOT NULL,
    "status" "public"."QuotationStatus" NOT NULL,
    "basePrice" DOUBLE PRECISION NOT NULL,
    "promotionPrice" DOUBLE PRECISION,
    "finalPrice" DOUBLE PRECISION NOT NULL,
    "validUntil" DATE NOT NULL,
    "customerId" INTEGER NOT NULL,
    "dealerStaffId" INTEGER NOT NULL,
    "motorbikeId" INTEGER NOT NULL,
    "colorId" INTEGER NOT NULL,
    "agencyId" INTEGER NOT NULL,

    CONSTRAINT "quotations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."deposits" (
    "id" SERIAL NOT NULL,
    "depositPercent" INTEGER NOT NULL,
    "depositAmount" DOUBLE PRECISION NOT NULL,
    "holdDays" DATE NOT NULL,
    "status" "public"."DepositStatus" NOT NULL,
    "quotationId" INTEGER NOT NULL,

    CONSTRAINT "deposits_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "deposits_quotationId_key" ON "public"."deposits"("quotationId");

-- AddForeignKey
ALTER TABLE "public"."customer_contracts" ADD CONSTRAINT "customer_contracts_quotationId_fkey" FOREIGN KEY ("quotationId") REFERENCES "public"."quotations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."contract_documents" ADD CONSTRAINT "contract_documents_customerContractId_fkey" FOREIGN KEY ("customerContractId") REFERENCES "public"."customer_contracts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."quotations" ADD CONSTRAINT "quotations_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "public"."customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."quotations" ADD CONSTRAINT "quotations_dealerStaffId_fkey" FOREIGN KEY ("dealerStaffId") REFERENCES "public"."staffs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."quotations" ADD CONSTRAINT "quotations_motorbikeId_fkey" FOREIGN KEY ("motorbikeId") REFERENCES "public"."electric_motorbikes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."quotations" ADD CONSTRAINT "quotations_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "public"."colors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."quotations" ADD CONSTRAINT "quotations_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "public"."agencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."deposits" ADD CONSTRAINT "deposits_quotationId_fkey" FOREIGN KEY ("quotationId") REFERENCES "public"."quotations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
