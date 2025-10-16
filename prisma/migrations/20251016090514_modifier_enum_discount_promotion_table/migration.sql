/*
  Warnings:

  - The values [active,inactive] on the enum `DiscountStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [percent,fixed] on the enum `DiscountValueType` will be removed. If these variants are still used in the database, this will fail.
  - The values [active,inactive] on the enum `PromotionStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [percent,fixed] on the enum `PromotionValueType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."DiscountStatus_new" AS ENUM ('ACTIVE', 'INACTIVE');
ALTER TABLE "public"."discount_policy" ALTER COLUMN "status" TYPE "public"."DiscountStatus_new" USING ("status"::text::"public"."DiscountStatus_new");
ALTER TABLE "public"."promotions" ALTER COLUMN "status" TYPE "public"."DiscountStatus_new" USING ("status"::text::"public"."DiscountStatus_new");
ALTER TYPE "public"."DiscountStatus" RENAME TO "DiscountStatus_old";
ALTER TYPE "public"."DiscountStatus_new" RENAME TO "DiscountStatus";
DROP TYPE "public"."DiscountStatus_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "public"."DiscountValueType_new" AS ENUM ('PERCENT', 'FIXED');
ALTER TABLE "public"."discount_policy" ALTER COLUMN "valueType" TYPE "public"."DiscountValueType_new" USING ("valueType"::text::"public"."DiscountValueType_new");
ALTER TYPE "public"."DiscountValueType" RENAME TO "DiscountValueType_old";
ALTER TYPE "public"."DiscountValueType_new" RENAME TO "DiscountValueType";
DROP TYPE "public"."DiscountValueType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "public"."PromotionStatus_new" AS ENUM ('ACTIVE', 'INACTIVE');
ALTER TYPE "public"."PromotionStatus" RENAME TO "PromotionStatus_old";
ALTER TYPE "public"."PromotionStatus_new" RENAME TO "PromotionStatus";
DROP TYPE "public"."PromotionStatus_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "public"."PromotionValueType_new" AS ENUM ('PERCENT', 'FIXED');
ALTER TABLE "public"."promotions" ALTER COLUMN "valueType" TYPE "public"."PromotionValueType_new" USING ("valueType"::text::"public"."PromotionValueType_new");
ALTER TYPE "public"."PromotionValueType" RENAME TO "PromotionValueType_old";
ALTER TYPE "public"."PromotionValueType_new" RENAME TO "PromotionValueType";
DROP TYPE "public"."PromotionValueType_old";
COMMIT;
