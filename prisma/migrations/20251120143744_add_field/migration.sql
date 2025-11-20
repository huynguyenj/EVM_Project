-- AlterTable
ALTER TABLE "public"."inventory" ADD COLUMN     "colorId" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."inventory" ADD CONSTRAINT "inventory_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "public"."colors"("id") ON DELETE SET NULL ON UPDATE CASCADE;
