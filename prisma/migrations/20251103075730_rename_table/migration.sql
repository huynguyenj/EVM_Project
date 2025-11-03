/*
  Warnings:

  - You are about to drop the `Ap_Batches` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Ap_Payments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Ap_Batches" DROP CONSTRAINT "Ap_Batches_agencyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Ap_Batches" DROP CONSTRAINT "Ap_Batches_agencyOrderId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Ap_Payments" DROP CONSTRAINT "Ap_Payments_apBatchesId_fkey";

-- DropTable
DROP TABLE "public"."Ap_Batches";

-- DropTable
DROP TABLE "public"."Ap_Payments";

-- CreateTable
CREATE TABLE "public"."ap_batches" (
    "id" SERIAL NOT NULL,
    "invoiceNumber" DOUBLE PRECISION NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "dueDate" DATE NOT NULL,
    "status" "public"."Ap_BatchesStatus" NOT NULL DEFAULT 'OPEN',
    "createAt" DATE NOT NULL,
    "agencyId" INTEGER NOT NULL,
    "agencyOrderId" INTEGER NOT NULL,

    CONSTRAINT "ap_batches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ap_payments" (
    "id" SERIAL NOT NULL,
    "paidDate" DATE NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "apBatchesId" INTEGER NOT NULL,

    CONSTRAINT "ap_payments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."ap_batches" ADD CONSTRAINT "ap_batches_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "public"."agencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ap_batches" ADD CONSTRAINT "ap_batches_agencyOrderId_fkey" FOREIGN KEY ("agencyOrderId") REFERENCES "public"."agency_orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ap_payments" ADD CONSTRAINT "ap_payments_apBatchesId_fkey" FOREIGN KEY ("apBatchesId") REFERENCES "public"."ap_batches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
