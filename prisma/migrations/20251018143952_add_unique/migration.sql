/*
  Warnings:

  - A unique constraint covering the columns `[motorbikeId]` on the table `Agency_Stock` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Agency_Stock_motorbikeId_key" ON "public"."Agency_Stock"("motorbikeId");
