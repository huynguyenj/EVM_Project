/*
  Warnings:

  - The values [valid,expired,cancel] on the enum `TransferContractStatus` will be removed. If these variants are still used in the database, this will fail.
  - Made the column `motorbikeId` on table `discount_policy` required. This step will fail if there are existing NULL values in that column.
  - Made the column `motorbikeId` on table `price_policy` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."TransferContractStatus_new" AS ENUM ('VALID', 'EXPIRED', 'CANCEL');
ALTER TABLE "public"."transfer_contract" ALTER COLUMN "status" TYPE "public"."TransferContractStatus_new" USING ("status"::text::"public"."TransferContractStatus_new");
ALTER TYPE "public"."TransferContractStatus" RENAME TO "TransferContractStatus_old";
ALTER TYPE "public"."TransferContractStatus_new" RENAME TO "TransferContractStatus";
DROP TYPE "public"."TransferContractStatus_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "public"."discount_policy" DROP CONSTRAINT "discount_policy_motorbikeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."price_policy" DROP CONSTRAINT "price_policy_motorbikeId_fkey";

-- AlterTable
ALTER TABLE "public"."discount_policy" ALTER COLUMN "motorbikeId" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."price_policy" ALTER COLUMN "motorbikeId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."price_policy" ADD CONSTRAINT "price_policy_motorbikeId_fkey" FOREIGN KEY ("motorbikeId") REFERENCES "public"."electric_motorbikes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."discount_policy" ADD CONSTRAINT "discount_policy_motorbikeId_fkey" FOREIGN KEY ("motorbikeId") REFERENCES "public"."electric_motorbikes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
