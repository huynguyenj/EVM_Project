import { Module } from '@nestjs/common';
import { VnpayService } from './vnpay.service';
import { VnpayController } from './vnpay.controller';
import { ConfigModule } from '@nestjs/config';
import vnpayConfig from 'src/common/config/vnpay.config';

@Module({
  imports: [ConfigModule.forFeature(vnpayConfig)],
  providers: [VnpayService],
  controllers: [VnpayController],
})
export class VnpayModule {}
