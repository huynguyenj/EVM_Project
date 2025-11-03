-- DropForeignKey
ALTER TABLE "public"."order_items" DROP CONSTRAINT "order_items_pricePolicyId_fkey";

-- AlterTable
ALTER TABLE "public"."order_items" ALTER COLUMN "pricePolicyId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."order_items" ADD CONSTRAINT "order_items_pricePolicyId_fkey" FOREIGN KEY ("pricePolicyId") REFERENCES "public"."price_policy"("id") ON DELETE SET NULL ON UPDATE CASCADE;
