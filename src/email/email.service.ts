import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CustomerContractService } from 'src/dealer-staff/customer-contract/customer-contract.service';
import {
  CustomerContractTemplate,
  CustomerScheduleTemplate,
  VALIDATION_CODE_TEMPLATE,
} from './email-html';
import { type ConfigType } from '@nestjs/config';
import { InstallmentContractService } from 'src/dealer-staff/installment-contract/installment-contract.service';
import resendConfig from 'src/common/config/resend.config';
import { Resend } from 'resend';
@Injectable()
export class EmailService {
  private resend: Resend;
  constructor(
    @Inject(resendConfig.KEY)
    private resendSetting: ConfigType<typeof resendConfig>,
    private customerContractService: CustomerContractService,
    private installmentContractService: InstallmentContractService,
  ) {
    this.resend = new Resend(this.resendSetting.resendApiKey);
  }

  private async sendEmail(
    to: string | string[],
    subject: string,
    html: string,
  ) {
    try {
      await this.resend.emails.send({
        from: `EVM system <${this.resendSetting.resendSender}>`,
        to: Array.isArray(to) ? to : [to],
        subject,
        html,
      });
      return;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async sendVerifyCode(verifiedCode: string, email: string) {
    const contentEmail = VALIDATION_CODE_TEMPLATE.replace(
      '{code}',
      verifiedCode,
    );
    await this.sendEmail(email, 'Validation code', contentEmail);
    return;
  }

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

    await this.sendEmail(
      customerInfo.customer.email,
      `Customer contract - ${customerInfo.title}`,
      contentEmail,
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
    await this.sendEmail(
      listInstallmentData.customerContract.customer.email,
      `Payment schedule - Customer ${listInstallmentData.customerContract.customer.name}`,
      contentEmail,
    );
  }
}
