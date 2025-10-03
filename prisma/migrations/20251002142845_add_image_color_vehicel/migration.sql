-- CreateTable
CREATE TABLE "public"."image_color_vehicle" (
    "id" SERIAL NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "colorId" INTEGER NOT NULL,

    CONSTRAINT "image_color_vehicle_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."image_color_vehicle" ADD CONSTRAINT "image_color_vehicle_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "public"."colors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
