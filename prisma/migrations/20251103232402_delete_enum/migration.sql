/*
  Warnings:

  - The values [ACCEPTED] on the enum `AgencyOrderStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."AgencyOrderStatus_new" AS ENUM ('DRAFT', 'PENDING', 'APPROVED', 'DELIVERED', 'CANCELED');
ALTER TABLE "public"."agency_orders" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."agency_orders" ALTER COLUMN "status" TYPE "public"."AgencyOrderStatus_new" USING ("status"::text::"public"."AgencyOrderStatus_new");
ALTER TYPE "public"."AgencyOrderStatus" RENAME TO "AgencyOrderStatus_old";
ALTER TYPE "public"."AgencyOrderStatus_new" RENAME TO "AgencyOrderStatus";
DROP TYPE "public"."AgencyOrderStatus_old";
ALTER TABLE "public"."agency_orders" ALTER COLUMN "status" SET DEFAULT 'DRAFT';
COMMIT;
