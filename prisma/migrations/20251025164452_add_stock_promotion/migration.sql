-- CreateEnum
CREATE TYPE "public"."AgencyStockPromotionValueType" AS ENUM ('PERCENT', 'FIXED');

-- CreateEnum
CREATE TYPE "public"."AgencyStockPromotionStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateTable
CREATE TABLE "public"."stock_promotions" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(300) NOT NULL,
    "description" TEXT NOT NULL,
    "valueType" "public"."PromotionValueType" NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "startAt" DATE NOT NULL,
    "endAt" DATE NOT NULL,
    "agencyId" INTEGER NOT NULL,
    "status" "public"."DiscountStatus" NOT NULL,

    CONSTRAINT "stock_promotions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."agency_stock_promotion" (
    "stockPromotionId" INTEGER NOT NULL,
    "agencyStockId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "agency_stock_promotion_stockPromotionId_agencyStockId_key" ON "public"."agency_stock_promotion"("stockPromotionId", "agencyStockId");

-- AddForeignKey
ALTER TABLE "public"."stock_promotions" ADD CONSTRAINT "stock_promotions_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "public"."agencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."agency_stock_promotion" ADD CONSTRAINT "agency_stock_promotion_stockPromotionId_fkey" FOREIGN KEY ("stockPromotionId") REFERENCES "public"."stock_promotions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."agency_stock_promotion" ADD CONSTRAINT "agency_stock_promotion_agencyStockId_fkey" FOREIGN KEY ("agencyStockId") REFERENCES "public"."agency_stocks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
