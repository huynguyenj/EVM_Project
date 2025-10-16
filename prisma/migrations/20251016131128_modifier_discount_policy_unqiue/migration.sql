/*
  Warnings:

  - A unique constraint covering the columns `[agencyId,motorbikeId,type]` on the table `discount_policy` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "discount_policy_agencyId_motorbikeId_type_key" ON "public"."discount_policy"("agencyId", "motorbikeId", "type");
