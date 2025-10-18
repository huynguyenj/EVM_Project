/*
  Warnings:

  - A unique constraint covering the columns `[roleName]` on the table `role` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "role_roleName_key" ON "public"."role"("roleName");
