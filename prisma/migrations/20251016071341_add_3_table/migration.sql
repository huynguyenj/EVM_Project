/*
  Warnings:

  - You are about to drop the `contract` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."DiscountType" AS ENUM ('VOLUME', 'SPECIAL');

-- CreateEnum
CREATE TYPE "public"."DiscountValueType" AS ENUM ('percent', 'fixed');

-- CreateEnum
CREATE TYPE "public"."DiscountStatus" AS ENUM ('active', 'inactive');

-- CreateEnum
CREATE TYPE "public"."PromotionValueType" AS ENUM ('percent', 'fixed');

-- CreateEnum
CREATE TYPE "public"."PromotionStatus" AS ENUM ('active', 'inactive');

-- DropForeignKey
ALTER TABLE "public"."contract" DROP CONSTRAINT "contract_agencyId_fkey";

-- DropTable
DROP TABLE "public"."contract";

-- CreateTable
CREATE TABLE "public"."price_policy" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "policy" TEXT NOT NULL,
    "wholesalePrice" DOUBLE PRECISION NOT NULL,
    "agencyId" INTEGER,
    "motorbikeId" INTEGER,

    CONSTRAINT "price_policy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."discount_policy" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(300) NOT NULL,
    "type" "public"."DiscountType" NOT NULL,
    "valueType" "public"."DiscountValueType" NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "min_quantity" INTEGER NOT NULL,
    "startAt" DATE NOT NULL,
    "endAt" DATE NOT NULL,
    "status" "public"."DiscountStatus" NOT NULL,
    "agencyId" INTEGER,
    "motorbikeId" INTEGER,

    CONSTRAINT "discount_policy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."promotions" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(300) NOT NULL,
    "description" TEXT NOT NULL,
    "valueType" "public"."PromotionValueType" NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "startAt" DATE NOT NULL,
    "endAt" DATE NOT NULL,
    "status" "public"."DiscountStatus" NOT NULL,
    "agencyId" INTEGER,
    "motorbikeId" INTEGER,

    CONSTRAINT "promotions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."price_policy" ADD CONSTRAINT "price_policy_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "public"."agencies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."price_policy" ADD CONSTRAINT "price_policy_motorbikeId_fkey" FOREIGN KEY ("motorbikeId") REFERENCES "public"."electric_motorbikes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."discount_policy" ADD CONSTRAINT "discount_policy_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "public"."agencies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."discount_policy" ADD CONSTRAINT "discount_policy_motorbikeId_fkey" FOREIGN KEY ("motorbikeId") REFERENCES "public"."electric_motorbikes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."promotions" ADD CONSTRAINT "promotions_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "public"."agencies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."promotions" ADD CONSTRAINT "promotions_motorbikeId_fkey" FOREIGN KEY ("motorbikeId") REFERENCES "public"."electric_motorbikes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
