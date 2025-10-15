/*
  Warnings:

  - You are about to alter the column `location` on the `agencies` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `address` on the `agencies` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.

*/
-- AlterTable
ALTER TABLE "public"."agencies" ALTER COLUMN "location" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "address" SET DATA TYPE VARCHAR(200);
