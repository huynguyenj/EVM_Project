/*
  Warnings:

  - A unique constraint covering the columns `[colorType]` on the table `colors` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "colors_colorType_key" ON "public"."colors"("colorType");
