/*
  Warnings:

  - Changed the type of `driveTime` on the `drive_trials` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."drive_trials" DROP COLUMN "driveTime",
ADD COLUMN     "driveTime" VARCHAR(10) NOT NULL;
