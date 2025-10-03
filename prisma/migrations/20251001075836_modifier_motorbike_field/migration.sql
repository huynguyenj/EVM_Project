/*
  Warnings:

  - You are about to alter the column `type` on the `Battery` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `capacity` on the `Battery` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `chargeTime` on the `Battery` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `chargeType` on the `Battery` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `energyConsumption` on the `Battery` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `limit` on the `Battery` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `colorType` on the `Color` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `motorType` on the `Configuration` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `speedLimit` on the `Configuration` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `name` on the `Electric_Motorbike` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `model` on the `Electric_Motorbike` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `makeFrom` on the `Electric_Motorbike` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `version` on the `Electric_Motorbike` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `brake` on the `Safe_Feature` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `lock` on the `Safe_Feature` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.

*/
-- AlterTable
ALTER TABLE "public"."Battery" ALTER COLUMN "type" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "capacity" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "chargeTime" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "chargeType" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "energyConsumption" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "limit" SET DATA TYPE VARCHAR(200);

-- AlterTable
ALTER TABLE "public"."Color" ALTER COLUMN "colorType" SET DATA TYPE VARCHAR(200);

-- AlterTable
ALTER TABLE "public"."Configuration" ALTER COLUMN "motorType" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "speedLimit" SET DATA TYPE VARCHAR(200);

-- AlterTable
ALTER TABLE "public"."Electric_Motorbike" ALTER COLUMN "name" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "model" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "makeFrom" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "version" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "isDeleted" SET DEFAULT false;

-- AlterTable
ALTER TABLE "public"."Safe_Feature" ALTER COLUMN "brake" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "lock" SET DATA TYPE VARCHAR(200);
