/*
  Warnings:

  - A unique constraint covering the columns `[motorbikeId,colorId]` on the table `agency_stocks` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `colorId` to the `agency_stocks` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."agency_stocks_motorbikeId_key";

-- AlterTable
ALTER TABLE "public"."agency_stocks" ADD COLUMN     "colorId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "agency_stocks_motorbikeId_colorId_key" ON "public"."agency_stocks"("motorbikeId", "colorId");

-- AddForeignKey
ALTER TABLE "public"."agency_stocks" ADD CONSTRAINT "agency_stocks_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "public"."colors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
