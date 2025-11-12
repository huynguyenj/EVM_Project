import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { ConfigModule } from '@nestjs/config';
import { CustomerContractModule } from 'src/dealer-staff/customer-contract/customer-contract.module';
import { InstallmentContractModule } from 'src/dealer-staff/installment-contract/installment-contract.module';
import resendConfig from 'src/common/config/resend.config';
@Module({
  imports: [
    InstallmentContractModule,
    CustomerContractModule,
    ConfigModule.forFeature(resendConfig),
  ],
  controllers: [EmailController],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
