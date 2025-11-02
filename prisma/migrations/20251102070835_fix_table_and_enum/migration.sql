/*
  Warnings:

  - Added the required column `status` to the `Quotation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Quotation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `period` to the `installment_schedule` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."QuotationType" AS ENUM ('AT_STORE', 'ORDER', 'PRE_ORDER');

-- AlterTable
ALTER TABLE "public"."Quotation" ADD COLUMN     "status" "public"."QuotationStatus" NOT NULL,
ADD COLUMN     "type" "public"."QuotationType" NOT NULL;

-- AlterTable
ALTER TABLE "public"."installment_schedule" ADD COLUMN     "period" DATE NOT NULL,
ALTER COLUMN "dueDate" DROP NOT NULL;
