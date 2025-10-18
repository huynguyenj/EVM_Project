/*
  Warnings:

  - You are about to alter the column `title` on the `price_policy` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `content` on the `price_policy` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.

*/
-- AlterTable
ALTER TABLE "public"."price_policy" ALTER COLUMN "title" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "content" SET DATA TYPE VARCHAR(200);
