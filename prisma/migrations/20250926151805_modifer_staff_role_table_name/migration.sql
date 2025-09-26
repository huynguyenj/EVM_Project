/*
  Warnings:

  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role_Permission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role_Staff` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Staff` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Token` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Feedback" DROP CONSTRAINT "Feedback_staffId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Order" DROP CONSTRAINT "Order_staffId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Role_Permission" DROP CONSTRAINT "Role_Permission_permissionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Role_Permission" DROP CONSTRAINT "Role_Permission_roleId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Role_Staff" DROP CONSTRAINT "Role_Staff_roleId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Role_Staff" DROP CONSTRAINT "Role_Staff_staffId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Staff" DROP CONSTRAINT "Staff_agencyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Staff" DROP CONSTRAINT "Staff_tokenId_fkey";

-- DropTable
DROP TABLE "public"."Role";

-- DropTable
DROP TABLE "public"."Role_Permission";

-- DropTable
DROP TABLE "public"."Role_Staff";

-- DropTable
DROP TABLE "public"."Staff";

-- DropTable
DROP TABLE "public"."Token";

-- CreateTable
CREATE TABLE "public"."staffs" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "password" TEXT NOT NULL,
    "fullname" VARCHAR(60),
    "email" TEXT NOT NULL,
    "phone" VARCHAR(15),
    "address" TEXT,
    "avatar" TEXT,
    "createAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "agencyId" INTEGER,
    "tokenId" INTEGER,

    CONSTRAINT "staffs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."token" (
    "id" SERIAL NOT NULL,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "createAt" DATE NOT NULL,

    CONSTRAINT "token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."role_staff" (
    "staffId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "role_staff_pkey" PRIMARY KEY ("staffId","roleId")
);

-- CreateTable
CREATE TABLE "public"."role" (
    "id" SERIAL NOT NULL,
    "roleName" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."role_permission" (
    "roleId" INTEGER NOT NULL,
    "permissionId" INTEGER NOT NULL,

    CONSTRAINT "role_permission_pkey" PRIMARY KEY ("roleId","permissionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "staffs_username_key" ON "public"."staffs"("username");

-- CreateIndex
CREATE UNIQUE INDEX "staffs_email_key" ON "public"."staffs"("email");

-- CreateIndex
CREATE UNIQUE INDEX "staffs_tokenId_key" ON "public"."staffs"("tokenId");

-- AddForeignKey
ALTER TABLE "public"."staffs" ADD CONSTRAINT "staffs_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "public"."Agency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."staffs" ADD CONSTRAINT "staffs_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "public"."token"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."role_staff" ADD CONSTRAINT "role_staff_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "public"."staffs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."role_staff" ADD CONSTRAINT "role_staff_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "public"."role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."role_permission" ADD CONSTRAINT "role_permission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "public"."role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."role_permission" ADD CONSTRAINT "role_permission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "public"."Permission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Feedback" ADD CONSTRAINT "Feedback_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "public"."staffs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "public"."staffs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
