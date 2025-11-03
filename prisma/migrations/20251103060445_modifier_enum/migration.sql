/*
  Warnings:

  - The values [DRAFT] on the enum `AgencyOrderType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."AgencyOrderType_new" AS ENUM ('FULL', 'DEFERRED');
ALTER TABLE "public"."agency_orders" ALTER COLUMN "orderType" TYPE "public"."AgencyOrderType_new" USING ("orderType"::text::"public"."AgencyOrderType_new");
ALTER TYPE "public"."AgencyOrderType" RENAME TO "AgencyOrderType_old";
ALTER TYPE "public"."AgencyOrderType_new" RENAME TO "AgencyOrderType";
DROP TYPE "public"."AgencyOrderType_old";
COMMIT;
