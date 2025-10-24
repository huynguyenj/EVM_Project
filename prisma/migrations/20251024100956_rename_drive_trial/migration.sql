/*
  Warnings:

  - You are about to drop the `Drive_Trial` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Drive_Trial" DROP CONSTRAINT "Drive_Trial_agencyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Drive_Trial" DROP CONSTRAINT "Drive_Trial_electricMotorbikeId_fkey";

-- DropTable
DROP TABLE "public"."Drive_Trial";

-- CreateTable
CREATE TABLE "public"."drive_trials" (
    "id" SERIAL NOT NULL,
    "fullname" VARCHAR(50) NOT NULL,
    "email" TEXT NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "driveDate" DATE NOT NULL,
    "driveTime" TIME NOT NULL,
    "status" "public"."DriveStatus" NOT NULL,
    "electricMotorbikeId" INTEGER NOT NULL,
    "agencyId" INTEGER NOT NULL,

    CONSTRAINT "drive_trials_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "drive_trials_electricMotorbikeId_key" ON "public"."drive_trials"("electricMotorbikeId");

-- AddForeignKey
ALTER TABLE "public"."drive_trials" ADD CONSTRAINT "drive_trials_electricMotorbikeId_fkey" FOREIGN KEY ("electricMotorbikeId") REFERENCES "public"."electric_motorbikes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."drive_trials" ADD CONSTRAINT "drive_trials_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "public"."agencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
