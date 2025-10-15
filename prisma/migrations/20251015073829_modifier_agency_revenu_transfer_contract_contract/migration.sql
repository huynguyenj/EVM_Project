/*
  Warnings:

  - You are about to drop the `Agency` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Contract` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Revenue` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Transfer_Contract` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Agency_Debt" DROP CONSTRAINT "Agency_Debt_transferContractId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Contract" DROP CONSTRAINT "Contract_agencyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Drive_Trial" DROP CONSTRAINT "Drive_Trial_agencyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Order" DROP CONSTRAINT "Order_agencyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Revenue" DROP CONSTRAINT "Revenue_agencyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Transfer_Contract" DROP CONSTRAINT "Transfer_Contract_agencyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Transfer_Contract" DROP CONSTRAINT "Transfer_Contract_electricMotorbikeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Transfer_Contract" DROP CONSTRAINT "Transfer_Contract_warehouseId_fkey";

-- DropForeignKey
ALTER TABLE "public"."staffs" DROP CONSTRAINT "staffs_agencyId_fkey";

-- DropTable
DROP TABLE "public"."Agency";

-- DropTable
DROP TABLE "public"."Contract";

-- DropTable
DROP TABLE "public"."Revenue";

-- DropTable
DROP TABLE "public"."Transfer_Contract";

-- CreateTable
CREATE TABLE "public"."agencies" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "location" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "contactInfo" TEXT NOT NULL,
    "status" "public"."AgencyStatus" NOT NULL DEFAULT 'Active',

    CONSTRAINT "agencies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."revenue" (
    "id" SERIAL NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "createAt" DATE NOT NULL,
    "updateAt" DATE NOT NULL,
    "agencyId" INTEGER NOT NULL,

    CONSTRAINT "revenue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."transfer_contract" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "policy" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "status" "public"."TransferContractStatus" NOT NULL,
    "createAt" DATE NOT NULL,
    "expiredAt" DATE NOT NULL,
    "agencyId" INTEGER NOT NULL,
    "warehouseId" INTEGER NOT NULL,
    "electricMotorbikeId" INTEGER NOT NULL,

    CONSTRAINT "transfer_contract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."contract" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "policy" TEXT NOT NULL,
    "wholesalePrice" DOUBLE PRECISION NOT NULL,
    "bulkPrice" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,
    "agencyId" INTEGER NOT NULL,

    CONSTRAINT "contract_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "revenue_agencyId_key" ON "public"."revenue"("agencyId");

-- CreateIndex
CREATE UNIQUE INDEX "contract_agencyId_key" ON "public"."contract"("agencyId");

-- AddForeignKey
ALTER TABLE "public"."staffs" ADD CONSTRAINT "staffs_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "public"."agencies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."revenue" ADD CONSTRAINT "revenue_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "public"."agencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."transfer_contract" ADD CONSTRAINT "transfer_contract_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "public"."agencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."transfer_contract" ADD CONSTRAINT "transfer_contract_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "public"."Warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."transfer_contract" ADD CONSTRAINT "transfer_contract_electricMotorbikeId_fkey" FOREIGN KEY ("electricMotorbikeId") REFERENCES "public"."electric_motorbikes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."contract" ADD CONSTRAINT "contract_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "public"."agencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Agency_Debt" ADD CONSTRAINT "Agency_Debt_transferContractId_fkey" FOREIGN KEY ("transferContractId") REFERENCES "public"."transfer_contract"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Drive_Trial" ADD CONSTRAINT "Drive_Trial_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "public"."agencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "public"."agencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
