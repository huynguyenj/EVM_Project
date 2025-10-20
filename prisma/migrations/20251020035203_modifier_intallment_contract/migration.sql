/*
  Warnings:

  - You are about to drop the column `customerId` on the `installment_contracts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[customerContractId]` on the table `installment_contracts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customerContractId` to the `installment_contracts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."installment_contracts" DROP CONSTRAINT "installment_contracts_customerId_fkey";

-- AlterTable
ALTER TABLE "public"."installment_contracts" DROP COLUMN "customerId",
ADD COLUMN     "customerContractId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "installment_contracts_customerContractId_key" ON "public"."installment_contracts"("customerContractId");

-- AddForeignKey
ALTER TABLE "public"."installment_contracts" ADD CONSTRAINT "installment_contracts_customerContractId_fkey" FOREIGN KEY ("customerContractId") REFERENCES "public"."customer_contracts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
