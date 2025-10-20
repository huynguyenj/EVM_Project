/*
  Warnings:

  - A unique constraint covering the columns `[agencyId,motorbikeId]` on the table `price_policy` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "price_policy_agencyId_motorbikeId_key" ON "public"."price_policy"("agencyId", "motorbikeId");
