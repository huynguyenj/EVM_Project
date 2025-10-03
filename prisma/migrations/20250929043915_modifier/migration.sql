/*
  Warnings:

  - You are about to drop the `Permission` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."role_permission" DROP CONSTRAINT "role_permission_permissionId_fkey";

-- DropTable
DROP TABLE "public"."Permission";

-- CreateTable
CREATE TABLE "public"."permissions" (
    "id" SERIAL NOT NULL,
    "permissionName" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "isDeleted" BOOLEAN NOT NULL,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."role_permission" ADD CONSTRAINT "role_permission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "public"."permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
