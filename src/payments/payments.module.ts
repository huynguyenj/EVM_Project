import { Module } from '@nestjs/common';
import { VnpayModule } from './vnpay/vnpay.module';

@Module({
  imports: [VnpayModule],
})
export class PaymentsModule {}
