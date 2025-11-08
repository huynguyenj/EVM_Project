import {
  Controller,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/types/role.enum';
import { EmailService } from './email.service';
import { ApiResponseDocument } from 'src/common/decorator';

@Controller('email')
@ApiTags('Email')
@ApiBearerAuth('access-token')
@Roles(Role.ADMIN, Role.DEALER_MANAGER, Role.DEALER_STAFF, Role.EVM_STAFF)
export class EmailController {
  constructor(private emailService: EmailService) {}

  @Post('customer-contract/:customerContractId')
  @ApiOperation({ summary: 'Send customer contract to customer email' })
  @ApiResponseDocument(HttpStatus.CREATED, Object, 'Sending email success')
  async sendCustomerContractEmail(
    @Param('customerContractId', ParseIntPipe) customerContractId: number,
  ) {
    await this.emailService.sendCustomerContractEmail(customerContractId);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Sending email success',
      data: {},
    };
  }
}
