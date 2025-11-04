import { Controller, Get, HttpStatus } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/types/role.enum';
import { DashboardService } from './dashboard.service';
import {
  ApiQueriesMulti,
  ApiResponseDocument,
  ApiResponseDocumentArray,
} from 'src/common/decorator';
import {
  ApBatchesQueries,
  ListTopMotorbikeOrderReport,
  QuarterContractRevenueResponse,
  QuarterRevenueContractAgencyQuery,
  TotalAgencyReportResponse,
  TotalApBatchResponse,
  TotalContractRevenueAgencyQuery,
  TotalMotorbikeReportResponse,
  TotalRevenueAgencyContractResponseDto,
  TotalWarehouseReportResponse,
} from './dto';
import {
  AgencyContractReportQuery,
  ApBatchesReportQuery,
  QuarterAgencyContractReportQuery,
} from './decorators';

@Controller('report')
@ApiTags('Admin - Dashboard')
@ApiBearerAuth('access-token')
@Roles(Role.ADMIN)
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get('total-contract/revenue')
  @ApiOperation({ summary: 'Get total revenue contract' })
  @ApiQuery({ name: 'agencyId', example: 1, required: false })
  @ApiResponseDocument(
    HttpStatus.OK,
    TotalRevenueAgencyContractResponseDto,
    'Get total contract revenue success',
  )
  async getTotalRevenueContract(
    @AgencyContractReportQuery()
    agencyContractQueries: TotalContractRevenueAgencyQuery,
  ) {
    const data =
      await this.dashboardService.getTotalContractRevenueOfAgencyReport(
        agencyContractQueries,
      );
    return {
      statusCode: HttpStatus.OK,
      message: 'Get total revenue contract success',
      data: data,
    };
  }

  @Get('total-contract/revenue/quarter')
  @ApiOperation({ summary: 'Get revenue in a quarter of agency' })
  @ApiQueriesMulti(
    {
      name: 'quarter',
      example: 1,
      type: Number,
      required: true,
      minimum: 1,
      maximum: 4,
    },
    { name: 'year', example: 2025, type: Number, required: true },
    { name: 'agencyId', example: 1, type: Number, required: false },
  )
  @ApiResponseDocument(
    HttpStatus.OK,
    QuarterContractRevenueResponse,
    'Get quarter revenue success',
  )
  async getQuarterRevenueOfAgency(
    @QuarterAgencyContractReportQuery()
    quarterRevenueContractQueries: QuarterRevenueContractAgencyQuery,
  ) {
    const data =
      await this.dashboardService.getRevenueContractOfAgencyByQuarterReport(
        quarterRevenueContractQueries,
      );
    return {
      statusCode: HttpStatus.OK,
      message: 'Get quarter revenue success',
      data: data,
    };
  }

  @Get('total/agencies')
  @ApiOperation({ summary: 'Get total agencies' })
  @ApiResponseDocument(
    HttpStatus.OK,
    TotalAgencyReportResponse,
    'Get total agencies success',
  )
  async getTotalAgencies() {
    const data = await this.dashboardService.getTotalAgencyReport();
    return {
      statusCode: HttpStatus.OK,
      message: 'Get total agencies success',
      data: data,
    };
  }

  @Get('total/warehouses')
  @ApiOperation({ summary: 'Get total warehouses' })
  @ApiResponseDocument(
    HttpStatus.OK,
    TotalWarehouseReportResponse,
    'Get total warehouses success',
  )
  async getTotalWarehouses() {
    const data = await this.dashboardService.getTotalWarehousesReport();
    return {
      statusCode: HttpStatus.OK,
      message: 'Get total warehouses success',
      data: data,
    };
  }

  @Get('total/motorbikes')
  @ApiOperation({ summary: 'Get total motorbikes' })
  @ApiResponseDocument(
    HttpStatus.OK,
    TotalMotorbikeReportResponse,
    'Get total motorbikes success',
  )
  async getTotalMotorbikes() {
    const data = await this.dashboardService.getTotalMotorbikeReport();
    return {
      statusCode: HttpStatus.OK,
      message: 'Get total motorbikes success',
      data: data,
    };
  }

  @Get('total/ap-batches')
  @ApiOperation({ summary: 'Get total ap batches' })
  @ApiQuery({ name: 'agencyId', example: 1, required: false })
  @ApiResponseDocument(
    HttpStatus.OK,
    TotalApBatchResponse,
    'Get total ap batches success',
  )
  async getTotalBatches(
    @ApBatchesReportQuery() apBatchesQueries: ApBatchesQueries,
  ) {
    const data =
      await this.dashboardService.getApBatchesReport(apBatchesQueries);
    return {
      statusCode: HttpStatus.OK,
      message: 'Get total ap batches success',
      data: data,
    };
  }

  @Get('top-10/motorbikes')
  @ApiOperation({ summary: 'Get top 10 motorbike orders' })
  @ApiResponseDocumentArray(
    HttpStatus.OK,
    ListTopMotorbikeOrderReport,
    'Get top 10 motorbike orders success',
  )
  async getTop10Motorbike() {
    const data = await this.dashboardService.getTop10MotorbikeOrderReport();
    return {
      statusCode: HttpStatus.OK,
      message: 'Get top 10 motorbike orders success',
      data: data,
    };
  }
}
