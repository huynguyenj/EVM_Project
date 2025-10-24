/*
  Warnings:

  - The values [pending,accept,cancel,finish] on the enum `DriveStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."DriveStatus_new" AS ENUM ('PENDING', 'ACCEPTED', 'CANCELED', 'COMPLETED');
ALTER TABLE "public"."drive_trials" ALTER COLUMN "status" TYPE "public"."DriveStatus_new" USING ("status"::text::"public"."DriveStatus_new");
ALTER TYPE "public"."DriveStatus" RENAME TO "DriveStatus_old";
ALTER TYPE "public"."DriveStatus_new" RENAME TO "DriveStatus";
DROP TYPE "public"."DriveStatus_old";
COMMIT;
