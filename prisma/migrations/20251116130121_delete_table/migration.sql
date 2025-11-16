/*
  Warnings:

  - You are about to drop the `feedback` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."feedback" DROP CONSTRAINT "feedback_customerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."feedback" DROP CONSTRAINT "feedback_staffId_fkey";

-- DropTable
DROP TABLE "public"."feedback";
