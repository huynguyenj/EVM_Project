import { Inject, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { CustomerContractService } from 'src/dealer-staff/customer-contract/customer-contract.service';
import {
  CustomerContractTemplate,
  CustomerScheduleTemplate,
} from './email-html';
import { emailOptions } from './utils';
import emailConfig from 'src/common/config/email.config';
import { type ConfigType } from '@nestjs/config';
import { InstallmentContractService } from 'src/dealer-staff/installment-contract/installment-contract.service';
@Injectable()
export class EmailService {
  constructor(
    @Inject('EMAIL_TRANSPORTER')
    private emailTransporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>,
    @Inject(emailConfig.KEY)
    private emailSetting: ConfigType<typeof emailConfig>,
    private customerContractService: CustomerContractService,
    private installmentContractService: InstallmentContractService,
  ) {}

  async sendCustomerContractEmail(customerContractId: number) {
    const customerInfo =
      await this.customerContractService.getCustomerContractDetailForEmail(
        customerContractId,
      );

    const contentEmail = CustomerContractTemplate.replace(
      '{customerName}',
      customerInfo.customer.name,
    )
      .replace('{contractTitle}', customerInfo.title)
      .replace('{contractContent}', customerInfo.content)
      .replace(
        '{signDate}',
        customerInfo.signDate
          ? customerInfo.signDate.toLocaleDateString()
          : 'Not sign yet',
      )
      .replace(
        '{deliveryDate}',
        customerInfo.deliveryDate
          ? customerInfo.deliveryDate.toLocaleDateString()
          : 'Not have delivery date yet',
      )
      .replace('{paidType}', customerInfo.contractPaidType)
      .replace('{finalPrice}', String(customerInfo.finalPrice.toLocaleString()))
      .replace('{vehicleName}', customerInfo.electricMotorbike.name)
      .replace('{color}', customerInfo.color.colorType)
      .replace('{model}', customerInfo.electricMotorbike.model)
      .replace('{makeFrom}', customerInfo.electricMotorbike.makeFrom)
      .replace('{version}', customerInfo.electricMotorbike.version)
      .replace('{staffName}', customerInfo.staff.fullname ?? '')
      .replace('{staffEmail}', customerInfo.staff.email)
      .replace('{agencyName}', customerInfo.agency.name);

    await this.emailTransporter.sendMail(
      emailOptions(
        this.emailSetting.email_user ?? '',
        [customerInfo.customer.email],
        `Customer contract - ${customerInfo.title}`,
        contentEmail,
      ),
    );
  }

  async sendInstallmentScheduleEmail(installmentContractId: number) {
    const listInstallmentData =
      await this.installmentContractService.getListInstallmentPaymentsForEmail(
        installmentContractId,
      );
    const tableRow: string[] = [];
    for (const installmentPayment of listInstallmentData.installmentPayments) {
      const cell = `
        <tr>
          <td>${installmentPayment.period.toLocaleDateString()}</td>
          <td>${installmentPayment.dueDate ? installmentPayment.dueDate.toLocaleDateString() : 'Not decided yet'}</td>
          <td>${installmentPayment.paidDate ? installmentPayment.paidDate.toLocaleDateString() : 'Not pay yet'}</td>
          <td>${installmentPayment.amountDue}</td>
          <td>${installmentPayment.amountPaid}</td>
          <td>${installmentPayment.penaltyAmount}</td>
          <td>${installmentPayment.status}</td>
        </tr>
      `;
      tableRow.push(cell);
    }
    const contentEmail = CustomerScheduleTemplate.replace(
      '{tableBody}',
      tableRow.join(''),
    );
    await this.emailTransporter.sendMail(
      emailOptions(
        this.emailSetting.email_user ?? '',
        [listInstallmentData.customerContract.customer.email],
        `Payment schedule - Customer ${listInstallmentData.customerContract.customer.name}`,
        contentEmail,
      ),
    );
  }
}
