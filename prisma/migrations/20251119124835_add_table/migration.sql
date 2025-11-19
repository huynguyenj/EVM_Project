-- CreateTable
CREATE TABLE "public"."verification_code" (
    "id" SERIAL NOT NULL,
    "code" INTEGER NOT NULL,
    "expiredAt" TIMESTAMP,
    "staffId" INTEGER NOT NULL,

    CONSTRAINT "verification_code_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "verification_code_staffId_key" ON "public"."verification_code"("staffId");

-- AddForeignKey
ALTER TABLE "public"."verification_code" ADD CONSTRAINT "verification_code_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "public"."staffs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
