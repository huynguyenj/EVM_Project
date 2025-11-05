import { Module } from '@nestjs/common';
import { VnpayService } from './vnpay.service';
import { VnpayController } from './vnpay.controller';
import { ConfigModule } from '@nestjs/config';
import vnpayConfig from 'src/common/config/vnpay.config';
import { BatchesManagementModule } from 'src/evm-staff/batches-management/batches-management.module';
import { CreditLineModule } from 'src/admin/credit-line/credit-line.module';

@Module({
  imports: [
    ConfigModule.forFeature(vnpayConfig),
    BatchesManagementModule,
    CreditLineModule,
  ],
  providers: [VnpayService],
  controllers: [VnpayController],
})
export class VnpayModule {}
