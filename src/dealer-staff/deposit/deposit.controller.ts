import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DepositService } from './deposit.service';
import { ApiResponseDocument } from 'src/common/decorator';
import { CreateDepositDto, DepositResponseDto } from './dto';

@Controller('deposit')
@ApiTags('Dealer Staff - Deposit')
@ApiBearerAuth('access-token')
export class DepositController {
  constructor(private depositService: DepositService) {}

  @Post()
  @ApiResponseDocument(
    HttpStatus.CREATED,
    DepositResponseDto,
    'Create Deposit success',
  )
  @ApiOperation({ summary: 'Create Deposit' })
  async createDeposit(@Body() createDepositDto: CreateDepositDto) {
    const deposit = await this.depositService.createDeposit(createDepositDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Create Deposit success',
      data: deposit,
    };
  }

  @Get(':depositId')
  @ApiResponseDocument(HttpStatus.OK, DepositResponseDto, 'Get Deposit success')
  @ApiOperation({ summary: 'Get Deposit by ID' })
  async getDepositById(@Param('depositId') depositId: number) {
    const deposit = await this.depositService.getDepositById(depositId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Get Deposit success',
      data: deposit,
    };
  }

  @Patch(':depositId')
  @ApiResponseDocument(
    HttpStatus.OK,
    DepositResponseDto,
    'Update Deposit success',
  )
  @ApiOperation({ summary: 'Update Deposit Status' })
  async updateDepositStatus(
    @Param('depositId') depositId: number,
    @Body() updateDepositDto: CreateDepositDto,
  ) {
    const updatedDeposit = await this.depositService.updateDeposit(
      depositId,
      updateDepositDto,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Update Deposit success',
      data: updatedDeposit,
    };
  }

  @Delete(':depositId')
  @ApiResponseDocument(HttpStatus.OK, Object, 'Delete Deposit success')
  @ApiOperation({ summary: 'Delete Deposit by ID' })
  async deleteDeposit(@Param('depositId') depositId: number) {
    await this.depositService.deleteDeposit(depositId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Delete Deposit success',
      data: {},
    };
  }
}
