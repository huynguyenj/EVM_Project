-- CreateTable
CREATE TABLE "public"."contract_full_payments" (
    "id" SERIAL NOT NULL,
    "period" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "createAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customerContractId" INTEGER NOT NULL,

    CONSTRAINT "contract_full_payments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."contract_full_payments" ADD CONSTRAINT "contract_full_payments_customerContractId_fkey" FOREIGN KEY ("customerContractId") REFERENCES "public"."customer_contracts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
