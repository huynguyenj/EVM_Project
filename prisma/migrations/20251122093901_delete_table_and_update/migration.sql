/*
  Warnings:

  - You are about to drop the column `creditChecked` on the `agency_orders` table. All the data in the column will be lost.
  - You are about to drop the column `subtotal` on the `agency_orders` table. All the data in the column will be lost.
  - You are about to drop the `ap_batches` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ap_payments` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `total` to the `agency_orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "public"."AgencyOrderStatus" ADD VALUE 'COMPLETED';

-- DropForeignKey
ALTER TABLE "public"."ap_batches" DROP CONSTRAINT "ap_batches_agencyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ap_batches" DROP CONSTRAINT "ap_batches_agencyOrderId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ap_payments" DROP CONSTRAINT "ap_payments_apBatchesId_fkey";

-- DropForeignKey
ALTER TABLE "public"."order_items" DROP CONSTRAINT "order_items_warehouseId_fkey";

-- AlterTable
ALTER TABLE "public"."agency_orders" DROP COLUMN "creditChecked",
DROP COLUMN "subtotal",
ADD COLUMN     "dueDate" DATE,
ADD COLUMN     "paidAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "partialAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "total" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "public"."credit_lines" ADD COLUMN     "currentDebt" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "public"."order_items" ALTER COLUMN "warehouseId" DROP NOT NULL;

-- DropTable
DROP TABLE "public"."ap_batches";

-- DropTable
DROP TABLE "public"."ap_payments";

-- DropEnum
DROP TYPE "public"."Ap_BatchesStatus";

-- CreateTable
CREATE TABLE "public"."order_payments" (
    "id" SERIAL NOT NULL,
    "invoiceNumber" DOUBLE PRECISION NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "payAt" DATE NOT NULL,
    "agencyOrderId" INTEGER NOT NULL,

    CONSTRAINT "order_payments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."order_items" ADD CONSTRAINT "order_items_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "public"."warehouses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."order_payments" ADD CONSTRAINT "order_payments_agencyOrderId_fkey" FOREIGN KEY ("agencyOrderId") REFERENCES "public"."agency_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
