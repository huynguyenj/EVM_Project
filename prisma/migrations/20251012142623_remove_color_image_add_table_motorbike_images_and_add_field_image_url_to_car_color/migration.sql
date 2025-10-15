/*
  Warnings:

  - You are about to drop the `image_color_vehicle` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `imageUrl` to the `motorbike_color` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."image_color_vehicle" DROP CONSTRAINT "image_color_vehicle_colorId_fkey";

-- AlterTable
ALTER TABLE "public"."motorbike_color" ADD COLUMN     "imageUrl" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."image_color_vehicle";

-- CreateTable
CREATE TABLE "public"."motorbike_images" (
    "id" SERIAL NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "motorbikeId" INTEGER NOT NULL,

    CONSTRAINT "motorbike_images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."motorbike_images" ADD CONSTRAINT "motorbike_images_motorbikeId_fkey" FOREIGN KEY ("motorbikeId") REFERENCES "public"."electric_motorbikes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
