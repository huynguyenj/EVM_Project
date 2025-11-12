/*
  Warnings:

  - The values [HOLDING] on the enum `DepositStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."DepositStatus_new" AS ENUM ('PENDING', 'APPLIED', 'EXPIRED');
ALTER TABLE "public"."deposits" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."deposits" ALTER COLUMN "status" TYPE "public"."DepositStatus_new" USING ("status"::text::"public"."DepositStatus_new");
ALTER TYPE "public"."DepositStatus" RENAME TO "DepositStatus_old";
ALTER TYPE "public"."DepositStatus_new" RENAME TO "DepositStatus";
DROP TYPE "public"."DepositStatus_old";
ALTER TABLE "public"."deposits" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;
