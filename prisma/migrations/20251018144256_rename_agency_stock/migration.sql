/*
  Warnings:

  - You are about to drop the `Agency_Stock` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Agency_Stock" DROP CONSTRAINT "Agency_Stock_agencyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Agency_Stock" DROP CONSTRAINT "Agency_Stock_motorbikeId_fkey";

-- DropTable
DROP TABLE "public"."Agency_Stock";

-- CreateTable
CREATE TABLE "public"."agency_stocks" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "createAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "agencyId" INTEGER NOT NULL,
    "motorbikeId" INTEGER NOT NULL,

    CONSTRAINT "agency_stocks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "agency_stocks_motorbikeId_key" ON "public"."agency_stocks"("motorbikeId");

-- AddForeignKey
ALTER TABLE "public"."agency_stocks" ADD CONSTRAINT "agency_stocks_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "public"."agencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."agency_stocks" ADD CONSTRAINT "agency_stocks_motorbikeId_fkey" FOREIGN KEY ("motorbikeId") REFERENCES "public"."electric_motorbikes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
