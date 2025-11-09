/*
  Warnings:

  - A unique constraint covering the columns `[motorbikeId,colorId,agencyId]` on the table `agency_stocks` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."agency_stocks_motorbikeId_colorId_key";

-- CreateIndex
CREATE UNIQUE INDEX "agency_stocks_motorbikeId_colorId_agencyId_key" ON "public"."agency_stocks"("motorbikeId", "colorId", "agencyId");
