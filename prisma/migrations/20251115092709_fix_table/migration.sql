/*
  Warnings:

  - The values [DELIVERED,CANCELED] on the enum `CustomerContractStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."CustomerContractStatus_new" AS ENUM ('PENDING', 'CONFIRMED', 'PROCESSING', 'COMPLETED', 'REJECTED');
ALTER TABLE "public"."customer_contracts" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."customer_contracts" ALTER COLUMN "status" TYPE "public"."CustomerContractStatus_new" USING ("status"::text::"public"."CustomerContractStatus_new");
ALTER TYPE "public"."CustomerContractStatus" RENAME TO "CustomerContractStatus_old";
ALTER TYPE "public"."CustomerContractStatus_new" RENAME TO "CustomerContractStatus";
DROP TYPE "public"."CustomerContractStatus_old";
ALTER TABLE "public"."customer_contracts" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;
