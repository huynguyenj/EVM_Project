/*
  Warnings:

  - You are about to drop the `Credit_Line` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Credit_Line" DROP CONSTRAINT "Credit_Line_agencyId_fkey";

-- DropTable
DROP TABLE "public"."Credit_Line";

-- CreateTable
CREATE TABLE "public"."credit_lines" (
    "id" SERIAL NOT NULL,
    "creditLimit" DOUBLE PRECISION NOT NULL,
    "warningThreshold" INTEGER NOT NULL,
    "overDueThreshHoldDays" INTEGER NOT NULL,
    "isBlocked" BOOLEAN NOT NULL DEFAULT false,
    "agencyId" INTEGER NOT NULL,

    CONSTRAINT "credit_lines_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "credit_lines_agencyId_key" ON "public"."credit_lines"("agencyId");

-- AddForeignKey
ALTER TABLE "public"."credit_lines" ADD CONSTRAINT "credit_lines_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "public"."agencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
