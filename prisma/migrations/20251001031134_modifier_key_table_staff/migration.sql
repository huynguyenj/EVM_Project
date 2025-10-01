/*
  Warnings:

  - You are about to drop the column `tokenId` on the `staffs` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[staffId]` on the table `token` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `staffId` to the `token` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."staffs" DROP CONSTRAINT "staffs_tokenId_fkey";

-- DropIndex
DROP INDEX "public"."staffs_tokenId_key";

-- AlterTable
ALTER TABLE "public"."staffs" DROP COLUMN "tokenId";

-- AlterTable
ALTER TABLE "public"."token" ADD COLUMN     "staffId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "token_staffId_key" ON "public"."token"("staffId");

-- AddForeignKey
ALTER TABLE "public"."token" ADD CONSTRAINT "token_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "public"."staffs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
