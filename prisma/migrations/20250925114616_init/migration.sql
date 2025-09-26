-- CreateEnum
CREATE TYPE "public"."AgencyStatus" AS ENUM ('Active', 'Inactive');

-- CreateEnum
CREATE TYPE "public"."TransferContractStatus" AS ENUM ('valid', 'expired', 'cancel');

-- CreateEnum
CREATE TYPE "public"."DriveStatus" AS ENUM ('pending', 'accept', 'cancel', 'finish');

-- CreateEnum
CREATE TYPE "public"."OrderType" AS ENUM ('order', 'pre_order');

-- CreateEnum
CREATE TYPE "public"."PaymentStatus" AS ENUM ('fail', 'success', 'processing', 'cancel');

-- CreateEnum
CREATE TYPE "public"."PaymentMethod" AS ENUM ('bank', 'pay_full', 'instalment');

-- CreateEnum
CREATE TYPE "public"."ShipmentStatus" AS ENUM ('pending', 'shipped', 'delivered', 'cancel');

-- CreateTable
CREATE TABLE "public"."Staff" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "password" TEXT NOT NULL,
    "fullname" VARCHAR(60) NOT NULL,
    "email" TEXT NOT NULL,
    "phone" VARCHAR(15) NOT NULL,
    "address" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "createAt" DATE NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "isDeleted" BOOLEAN NOT NULL,
    "agencyId" INTEGER,
    "tokenId" INTEGER NOT NULL,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Token" (
    "id" SERIAL NOT NULL,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "createAt" DATE NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Role_Staff" (
    "staffId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "Role_Staff_pkey" PRIMARY KEY ("staffId","roleId")
);

-- CreateTable
CREATE TABLE "public"."Role" (
    "id" SERIAL NOT NULL,
    "roleName" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "isDeleted" BOOLEAN NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Role_Permission" (
    "roleId" INTEGER NOT NULL,
    "permissionId" INTEGER NOT NULL,

    CONSTRAINT "Role_Permission_pkey" PRIMARY KEY ("roleId","permissionId")
);

-- CreateTable
CREATE TABLE "public"."Permission" (
    "id" SERIAL NOT NULL,
    "permissionName" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "isDeleted" BOOLEAN NOT NULL,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Agency" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "location" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "contactInfo" TEXT NOT NULL,
    "status" "public"."AgencyStatus" NOT NULL,

    CONSTRAINT "Agency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Revenue" (
    "id" SERIAL NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "createAt" DATE NOT NULL,
    "updateAt" DATE NOT NULL,
    "agencyId" INTEGER NOT NULL,

    CONSTRAINT "Revenue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Transfer_Contract" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "policy" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "status" "public"."TransferContractStatus" NOT NULL,
    "createAt" DATE NOT NULL,
    "expiredAt" DATE NOT NULL,
    "agencyId" INTEGER NOT NULL,
    "warehouseId" INTEGER NOT NULL,
    "electricMotorbikeId" INTEGER NOT NULL,

    CONSTRAINT "Transfer_Contract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Contract" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "policy" TEXT NOT NULL,
    "wholesalePrice" DOUBLE PRECISION NOT NULL,
    "bulkPrice" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,
    "agencyId" INTEGER NOT NULL,

    CONSTRAINT "Contract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Agency_Debt" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "duration" TEXT NOT NULL,
    "startAt" DATE NOT NULL,
    "endAt" DATE NOT NULL,
    "isCompleted" BOOLEAN NOT NULL,
    "transferContractId" INTEGER NOT NULL,

    CONSTRAINT "Agency_Debt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Agency_Paid_Process" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "paidAt" DATE NOT NULL,

    CONSTRAINT "Agency_Paid_Process_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Warehouse" (
    "id" SERIAL NOT NULL,
    "location" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,

    CONSTRAINT "Warehouse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Inventory" (
    "electricMotorbikeId" INTEGER NOT NULL,
    "warehouseId" INTEGER NOT NULL,
    "quantity" BIGINT NOT NULL,
    "stockDate" DATE NOT NULL,
    "lastUpdate" DATE NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("electricMotorbikeId","warehouseId")
);

-- CreateTable
CREATE TABLE "public"."Customer" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "address" TEXT NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "email" TEXT NOT NULL,
    "credentialId" INTEGER NOT NULL,
    "dob" DATE NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Customer_Debt" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "duration" TEXT NOT NULL,
    "startAt" DATE NOT NULL,
    "endAt" DATE NOT NULL,
    "isCompleted" BOOLEAN NOT NULL,
    "customerId" INTEGER NOT NULL,

    CONSTRAINT "Customer_Debt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Paid_Process" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "paidAt" DATE NOT NULL,
    "customerDebtId" INTEGER NOT NULL,

    CONSTRAINT "Paid_Process_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Voucher" (
    "id" SERIAL NOT NULL,
    "percentReduce" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "expiredDate" DATE NOT NULL,
    "usageLimit" DOUBLE PRECISION NOT NULL,
    "customerId" INTEGER NOT NULL,

    CONSTRAINT "Voucher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Feedback" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "image" TEXT,
    "createAt" DATE NOT NULL,
    "isResolve" BOOLEAN NOT NULL,
    "isDeleted" BOOLEAN NOT NULL,
    "customerId" INTEGER NOT NULL,
    "staffId" INTEGER NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Drive_Trial" (
    "id" SERIAL NOT NULL,
    "fullname" VARCHAR(50) NOT NULL,
    "email" TEXT NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "driveDate" DATE NOT NULL,
    "driveTime" TIME NOT NULL,
    "status" "public"."DriveStatus" NOT NULL,
    "electricMotorbikeId" INTEGER NOT NULL,
    "agencyId" INTEGER NOT NULL,

    CONSTRAINT "Drive_Trial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Electric_Motorbike" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "makeFrom" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL,

    CONSTRAINT "Electric_Motorbike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Configuration" (
    "id" SERIAL NOT NULL,
    "motorType" TEXT NOT NULL,
    "speedLimit" TEXT NOT NULL,
    "maximumCapacity" INTEGER NOT NULL,
    "electricMotorbikeId" INTEGER NOT NULL,

    CONSTRAINT "Configuration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Motorbike_Color" (
    "motorbikeId" INTEGER NOT NULL,
    "colorId" INTEGER NOT NULL,

    CONSTRAINT "Motorbike_Color_pkey" PRIMARY KEY ("motorbikeId","colorId")
);

-- CreateTable
CREATE TABLE "public"."Color" (
    "id" SERIAL NOT NULL,
    "colorType" TEXT NOT NULL,

    CONSTRAINT "Color_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Appearance" (
    "id" SERIAL NOT NULL,
    "length" DOUBLE PRECISION NOT NULL,
    "width" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "undercarriageDistance" DOUBLE PRECISION NOT NULL,
    "storageLimit" DOUBLE PRECISION NOT NULL,
    "electricMotorbikeId" INTEGER NOT NULL,

    CONSTRAINT "Appearance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Safe_Feature" (
    "id" SERIAL NOT NULL,
    "brake" TEXT NOT NULL,
    "lock" TEXT NOT NULL,
    "electricMotorbikeId" INTEGER NOT NULL,

    CONSTRAINT "Safe_Feature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Battery" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "capacity" TEXT NOT NULL,
    "chargeTime" TEXT NOT NULL,
    "chargeType" TEXT NOT NULL,
    "energyConsumption" TEXT NOT NULL,
    "limit" TEXT NOT NULL,
    "electricMotorbikeId" INTEGER NOT NULL,

    CONSTRAINT "Battery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Order" (
    "id" SERIAL NOT NULL,
    "type" "public"."OrderType" NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "address" DOUBLE PRECISION NOT NULL,
    "orderDate" DATE NOT NULL,
    "customerId" INTEGER NOT NULL,
    "staffId" INTEGER NOT NULL,
    "agencyId" INTEGER NOT NULL,
    "electricMotorbikeId" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Payment" (
    "id" SERIAL NOT NULL,
    "paymentMethod" "public"."PaymentMethod" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" "public"."PaymentStatus" NOT NULL,
    "paidAt" DATE NOT NULL,
    "orderId" INTEGER NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Shipment" (
    "id" SERIAL NOT NULL,
    "trackingNumber" BIGINT NOT NULL,
    "carrier" TEXT NOT NULL,
    "shippedAt" DATE NOT NULL,
    "deliveredAt" DATE NOT NULL,
    "status" "public"."ShipmentStatus" NOT NULL,
    "orderId" INTEGER NOT NULL,

    CONSTRAINT "Shipment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Staff_username_key" ON "public"."Staff"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_email_key" ON "public"."Staff"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_tokenId_key" ON "public"."Staff"("tokenId");

-- CreateIndex
CREATE UNIQUE INDEX "Revenue_agencyId_key" ON "public"."Revenue"("agencyId");

-- CreateIndex
CREATE UNIQUE INDEX "Contract_agencyId_key" ON "public"."Contract"("agencyId");

-- CreateIndex
CREATE UNIQUE INDEX "Agency_Debt_transferContractId_key" ON "public"."Agency_Debt"("transferContractId");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "public"."Customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_credentialId_key" ON "public"."Customer"("credentialId");

-- CreateIndex
CREATE UNIQUE INDEX "Drive_Trial_electricMotorbikeId_key" ON "public"."Drive_Trial"("electricMotorbikeId");

-- CreateIndex
CREATE UNIQUE INDEX "Configuration_electricMotorbikeId_key" ON "public"."Configuration"("electricMotorbikeId");

-- CreateIndex
CREATE UNIQUE INDEX "Appearance_electricMotorbikeId_key" ON "public"."Appearance"("electricMotorbikeId");

-- CreateIndex
CREATE UNIQUE INDEX "Safe_Feature_electricMotorbikeId_key" ON "public"."Safe_Feature"("electricMotorbikeId");

-- CreateIndex
CREATE UNIQUE INDEX "Battery_electricMotorbikeId_key" ON "public"."Battery"("electricMotorbikeId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_electricMotorbikeId_key" ON "public"."Order"("electricMotorbikeId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_orderId_key" ON "public"."Payment"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "Shipment_orderId_key" ON "public"."Shipment"("orderId");

-- AddForeignKey
ALTER TABLE "public"."Staff" ADD CONSTRAINT "Staff_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "public"."Agency"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Staff" ADD CONSTRAINT "Staff_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "public"."Token"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Role_Staff" ADD CONSTRAINT "Role_Staff_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "public"."Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Role_Staff" ADD CONSTRAINT "Role_Staff_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "public"."Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Role_Permission" ADD CONSTRAINT "Role_Permission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "public"."Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Role_Permission" ADD CONSTRAINT "Role_Permission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "public"."Permission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Revenue" ADD CONSTRAINT "Revenue_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "public"."Agency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Transfer_Contract" ADD CONSTRAINT "Transfer_Contract_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "public"."Agency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Transfer_Contract" ADD CONSTRAINT "Transfer_Contract_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "public"."Warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Transfer_Contract" ADD CONSTRAINT "Transfer_Contract_electricMotorbikeId_fkey" FOREIGN KEY ("electricMotorbikeId") REFERENCES "public"."Electric_Motorbike"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Contract" ADD CONSTRAINT "Contract_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "public"."Agency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Agency_Debt" ADD CONSTRAINT "Agency_Debt_transferContractId_fkey" FOREIGN KEY ("transferContractId") REFERENCES "public"."Transfer_Contract"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Inventory" ADD CONSTRAINT "Inventory_electricMotorbikeId_fkey" FOREIGN KEY ("electricMotorbikeId") REFERENCES "public"."Electric_Motorbike"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Inventory" ADD CONSTRAINT "Inventory_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "public"."Warehouse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Customer_Debt" ADD CONSTRAINT "Customer_Debt_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "public"."Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Paid_Process" ADD CONSTRAINT "Paid_Process_id_fkey" FOREIGN KEY ("id") REFERENCES "public"."Customer_Debt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Voucher" ADD CONSTRAINT "Voucher_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "public"."Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Feedback" ADD CONSTRAINT "Feedback_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "public"."Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Feedback" ADD CONSTRAINT "Feedback_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "public"."Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Drive_Trial" ADD CONSTRAINT "Drive_Trial_electricMotorbikeId_fkey" FOREIGN KEY ("electricMotorbikeId") REFERENCES "public"."Electric_Motorbike"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Drive_Trial" ADD CONSTRAINT "Drive_Trial_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "public"."Agency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Configuration" ADD CONSTRAINT "Configuration_electricMotorbikeId_fkey" FOREIGN KEY ("electricMotorbikeId") REFERENCES "public"."Electric_Motorbike"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Motorbike_Color" ADD CONSTRAINT "Motorbike_Color_motorbikeId_fkey" FOREIGN KEY ("motorbikeId") REFERENCES "public"."Electric_Motorbike"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Motorbike_Color" ADD CONSTRAINT "Motorbike_Color_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "public"."Color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Appearance" ADD CONSTRAINT "Appearance_electricMotorbikeId_fkey" FOREIGN KEY ("electricMotorbikeId") REFERENCES "public"."Electric_Motorbike"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Safe_Feature" ADD CONSTRAINT "Safe_Feature_electricMotorbikeId_fkey" FOREIGN KEY ("electricMotorbikeId") REFERENCES "public"."Electric_Motorbike"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Battery" ADD CONSTRAINT "Battery_electricMotorbikeId_fkey" FOREIGN KEY ("electricMotorbikeId") REFERENCES "public"."Electric_Motorbike"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "public"."Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "public"."Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "public"."Agency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_electricMotorbikeId_fkey" FOREIGN KEY ("electricMotorbikeId") REFERENCES "public"."Electric_Motorbike"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payment" ADD CONSTRAINT "Payment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Shipment" ADD CONSTRAINT "Shipment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
