import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InstallmentPlanService } from './installment-plan.service';
import {
  ApiQueriesAndPagination,
  ApiResponseDocument,
} from 'src/common/decorator';
import {
  CreateInstallmentPlanDto,
  InstallmentPlanQueries,
  InstallmentResponsePlanDto,
  UpdateInstallmentPlanDto,
} from './dto';
import { ApiResponseDocumentPagination } from 'src/common/decorator/swagger-decorator/api.response.document.pagination';
import { InterestPaidType } from './types';
import { InstallmentStatus } from 'generated/prisma';
import { InstallmentPlanQuery } from './decorators';

@Controller('installment-plan')
@ApiBearerAuth('access-token')
@ApiTags('Dealer Manager & Dealer Staff - Installment Plan')
export class InstallmentPlanController {
  constructor(private installmentPlanService: InstallmentPlanService) {}

  @Post()
  @ApiResponseDocument(
    HttpStatus.CREATED,
    InstallmentResponsePlanDto,
    'Create installment plan success',
  )
  @ApiOperation({ summary: 'Create installment plan' })
  async createInstallmentPlan(
    @Body() createInstallmentPlanDto: CreateInstallmentPlanDto,
  ) {
    const createdData = await this.installmentPlanService.createInstallmentPlan(
      createInstallmentPlanDto,
    );
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Create installment plan success',
      data: createdData,
    };
  }

  @Get('list/:agencyId')
  @ApiOperation({ summary: 'Get list installment plans' })
  @ApiResponseDocumentPagination(
    HttpStatus.OK,
    InstallmentResponsePlanDto,
    'Get list installment plan success',
  )
  @ApiQueriesAndPagination(
    {
      name: 'interestPaidType',
      example: InterestPaidType.FLAT,
      required: false,
    },
    { name: 'status', example: InstallmentStatus.ACTIVE, required: false },
    { name: 'sort', example: 'newest', required: false },
  )
  async getListInstallmentPlan(
    @Param('agencyId', ParseIntPipe) agencyId: number,
    @InstallmentPlanQuery() installmentPlanQueries: InstallmentPlanQueries,
  ) {
    const listData = await this.installmentPlanService.getListInstallmentPlan(
      agencyId,
      installmentPlanQueries,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Get list installment plan success!',
      data: listData.data,
      paginationInfo: listData.paginationInfo,
    };
  }

  @Get('detail/:installmentId')
  @ApiOperation({ summary: 'Get installment detail' })
  @ApiResponseDocument(
    HttpStatus.OK,
    InstallmentResponsePlanDto,
    'Get installment detail success',
  )
  async getInstallmentPlanDetail(
    @Param('installmentId', ParseIntPipe) installmentId: number,
  ) {
    const data =
      await this.installmentPlanService.getInstallmentPlanDetail(installmentId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Get installment detail success',
      data: data,
    };
  }

  @Patch(':installmentId')
  @ApiOperation({ summary: 'Update installment plan' })
  @ApiResponseDocument(
    HttpStatus.OK,
    InstallmentResponsePlanDto,
    'Update installment plan success',
  )
  async updateInstallmentPlan(
    @Param('installmentId', ParseIntPipe) installmentId: number,
    @Body() updateInstallmentDto: UpdateInstallmentPlanDto,
  ) {
    const data = await this.installmentPlanService.updateInstallmentPlan(
      installmentId,
      updateInstallmentDto,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Update installment plan success',
      data: data,
    };
  }

  @Delete(':installmentId')
  @ApiOperation({ summary: 'Delete installment success' })
  @ApiResponseDocument(HttpStatus.OK, Object, 'Delete installment success')
  async deleteInstallmentPlan(
    @Param('installmentId', ParseIntPipe) installmentId: number,
  ) {
    await this.installmentPlanService.deleteInstallmentPlan(installmentId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Delete installment plan success',
      data: {},
    };
  }
}
