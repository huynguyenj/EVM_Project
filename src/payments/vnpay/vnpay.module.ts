import { Module } from '@nestjs/common';
import { VnpayService } from './vnpay.service';
import { VnpayController } from './vnpay.controller';
import { ConfigModule } from '@nestjs/config';
import vnpayConfig from 'src/common/config/vnpay.config';
// import { BatchesManagementModule } from 'src/evm-staff/batches-management/batches-management.module';
import { CreditLineModule } from 'src/admin/credit-line/credit-line.module';
import { CustomerContractModule } from 'src/dealer-staff/customer-contract/customer-contract.module';
import { DepositModule } from 'src/dealer-staff/deposit/deposit.module';
import { ContractFullPaymentModule } from 'src/dealer-staff/contract-full-payment/contract-full-payment.module';
import { OrderRestockModule } from 'src/dealer-manager/order-restock/order-restock.module';

@Module({
  imports: [
    ContractFullPaymentModule,
    ConfigModule.forFeature(vnpayConfig),
    // BatchesManagementModule,
    CreditLineModule,
    OrderRestockModule,
    CustomerContractModule,
    DepositModule,
    CreditLineModule,
  ],
  providers: [VnpayService],
  controllers: [VnpayController],
})
export class VnpayModule {}
