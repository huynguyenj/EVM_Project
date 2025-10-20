/*
  Warnings:

  - You are about to drop the column `paidBeforeInterestEachMonth` on the `installment_contracts` table. All the data in the column will be lost.
  - You are about to drop the column `paidWithInterestEachMonth` on the `installment_contracts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."installment_contracts" DROP COLUMN "paidBeforeInterestEachMonth",
DROP COLUMN "paidWithInterestEachMonth";
