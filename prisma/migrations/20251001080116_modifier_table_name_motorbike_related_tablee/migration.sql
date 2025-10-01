/*
  Warnings:

  - You are about to drop the `Appearance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Battery` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Color` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Configuration` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Electric_Motorbike` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Motorbike_Color` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Safe_Feature` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Appearance" DROP CONSTRAINT "Appearance_electricMotorbikeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Battery" DROP CONSTRAINT "Battery_electricMotorbikeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Configuration" DROP CONSTRAINT "Configuration_electricMotorbikeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Drive_Trial" DROP CONSTRAINT "Drive_Trial_electricMotorbikeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Inventory" DROP CONSTRAINT "Inventory_electricMotorbikeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Motorbike_Color" DROP CONSTRAINT "Motorbike_Color_colorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Motorbike_Color" DROP CONSTRAINT "Motorbike_Color_motorbikeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Order" DROP CONSTRAINT "Order_electricMotorbikeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Safe_Feature" DROP CONSTRAINT "Safe_Feature_electricMotorbikeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Transfer_Contract" DROP CONSTRAINT "Transfer_Contract_electricMotorbikeId_fkey";

-- DropTable
DROP TABLE "public"."Appearance";

-- DropTable
DROP TABLE "public"."Battery";

-- DropTable
DROP TABLE "public"."Color";

-- DropTable
DROP TABLE "public"."Configuration";

-- DropTable
DROP TABLE "public"."Electric_Motorbike";

-- DropTable
DROP TABLE "public"."Motorbike_Color";

-- DropTable
DROP TABLE "public"."Safe_Feature";

-- CreateTable
CREATE TABLE "public"."electric_motorbikes" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "model" VARCHAR(200) NOT NULL,
    "makeFrom" VARCHAR(100) NOT NULL,
    "version" VARCHAR(100) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "electric_motorbikes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."configurations" (
    "id" SERIAL NOT NULL,
    "motorType" VARCHAR(200) NOT NULL,
    "speedLimit" VARCHAR(200) NOT NULL,
    "maximumCapacity" INTEGER NOT NULL,
    "electricMotorbikeId" INTEGER NOT NULL,

    CONSTRAINT "configurations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."motorbike_color" (
    "motorbikeId" INTEGER NOT NULL,
    "colorId" INTEGER NOT NULL,

    CONSTRAINT "motorbike_color_pkey" PRIMARY KEY ("motorbikeId","colorId")
);

-- CreateTable
CREATE TABLE "public"."colors" (
    "id" SERIAL NOT NULL,
    "colorType" VARCHAR(200) NOT NULL,

    CONSTRAINT "colors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."appearances" (
    "id" SERIAL NOT NULL,
    "length" DOUBLE PRECISION NOT NULL,
    "width" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "undercarriageDistance" DOUBLE PRECISION NOT NULL,
    "storageLimit" DOUBLE PRECISION NOT NULL,
    "electricMotorbikeId" INTEGER NOT NULL,

    CONSTRAINT "appearances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."safe_features" (
    "id" SERIAL NOT NULL,
    "brake" VARCHAR(200) NOT NULL,
    "lock" VARCHAR(200) NOT NULL,
    "electricMotorbikeId" INTEGER NOT NULL,

    CONSTRAINT "safe_features_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."batteries" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR(200) NOT NULL,
    "capacity" VARCHAR(200) NOT NULL,
    "chargeTime" VARCHAR(200) NOT NULL,
    "chargeType" VARCHAR(200) NOT NULL,
    "energyConsumption" VARCHAR(200) NOT NULL,
    "limit" VARCHAR(200) NOT NULL,
    "electricMotorbikeId" INTEGER NOT NULL,

    CONSTRAINT "batteries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "configurations_electricMotorbikeId_key" ON "public"."configurations"("electricMotorbikeId");

-- CreateIndex
CREATE UNIQUE INDEX "appearances_electricMotorbikeId_key" ON "public"."appearances"("electricMotorbikeId");

-- CreateIndex
CREATE UNIQUE INDEX "safe_features_electricMotorbikeId_key" ON "public"."safe_features"("electricMotorbikeId");

-- CreateIndex
CREATE UNIQUE INDEX "batteries_electricMotorbikeId_key" ON "public"."batteries"("electricMotorbikeId");

-- AddForeignKey
ALTER TABLE "public"."Transfer_Contract" ADD CONSTRAINT "Transfer_Contract_electricMotorbikeId_fkey" FOREIGN KEY ("electricMotorbikeId") REFERENCES "public"."electric_motorbikes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Inventory" ADD CONSTRAINT "Inventory_electricMotorbikeId_fkey" FOREIGN KEY ("electricMotorbikeId") REFERENCES "public"."electric_motorbikes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Drive_Trial" ADD CONSTRAINT "Drive_Trial_electricMotorbikeId_fkey" FOREIGN KEY ("electricMotorbikeId") REFERENCES "public"."electric_motorbikes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."configurations" ADD CONSTRAINT "configurations_electricMotorbikeId_fkey" FOREIGN KEY ("electricMotorbikeId") REFERENCES "public"."electric_motorbikes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."motorbike_color" ADD CONSTRAINT "motorbike_color_motorbikeId_fkey" FOREIGN KEY ("motorbikeId") REFERENCES "public"."electric_motorbikes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."motorbike_color" ADD CONSTRAINT "motorbike_color_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "public"."colors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."appearances" ADD CONSTRAINT "appearances_electricMotorbikeId_fkey" FOREIGN KEY ("electricMotorbikeId") REFERENCES "public"."electric_motorbikes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."safe_features" ADD CONSTRAINT "safe_features_electricMotorbikeId_fkey" FOREIGN KEY ("electricMotorbikeId") REFERENCES "public"."electric_motorbikes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."batteries" ADD CONSTRAINT "batteries_electricMotorbikeId_fkey" FOREIGN KEY ("electricMotorbikeId") REFERENCES "public"."electric_motorbikes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_electricMotorbikeId_fkey" FOREIGN KEY ("electricMotorbikeId") REFERENCES "public"."electric_motorbikes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
