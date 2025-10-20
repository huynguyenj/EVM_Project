-- CreateTable
CREATE TABLE "public"."Agency_Stock" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "createAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "agencyId" INTEGER NOT NULL,
    "motorbikeId" INTEGER NOT NULL,

    CONSTRAINT "Agency_Stock_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Agency_Stock" ADD CONSTRAINT "Agency_Stock_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "public"."agencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Agency_Stock" ADD CONSTRAINT "Agency_Stock_motorbikeId_fkey" FOREIGN KEY ("motorbikeId") REFERENCES "public"."electric_motorbikes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
