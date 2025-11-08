import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import emailConfig from 'src/common/config/email.config';
import { ConfigModule, ConfigType } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { CustomerContractModule } from 'src/dealer-staff/customer-contract/customer-contract.module';
@Module({
  imports: [CustomerContractModule, ConfigModule.forFeature(emailConfig)],
  controllers: [EmailController],
  providers: [
    EmailService,
    {
      provide: 'EMAIL_TRANSPORTER',
      inject: [emailConfig.KEY],
      useFactory: (emailSetting: ConfigType<typeof emailConfig>) => {
        const transporter = nodemailer.createTransport({
          host: emailSetting.email_host,
          port: emailSetting.email_port,
          secure: false,
          auth: {
            user: emailSetting.email_user,
            pass: emailSetting.email_password,
          },
        } as nodemailer.TransportOptions);
        return transporter;
      },
    },
  ],
})
export class EmailModule {}
