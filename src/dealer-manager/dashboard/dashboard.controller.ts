import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
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
  ApiQueriesAndPagination,
  ApiResponseDocument,
  ApiResponseDocumentArray,
} from 'src/common/decorator';
import {
  ContractDataChartResponse,
  StaffContractRevenue,
  StaffRevenueQueries,
  TotalContractChartQueries,
  TotalCustomerResponse,
  TotalRevenueAgencyResponse,
} from './dto';
import {
  StaffRevenueContractQuery,
  TotalContractChartQuery,
} from './decorators';
import { ApiResponseDocumentPagination } from 'src/common/decorator/swagger-decorator/api.response.document.pagination';

@Controller('dashboard')
@ApiTags('Dealer manager - Dashboard')
@ApiBearerAuth('access-token')
@Roles(Role.DEALER_MANAGER)
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get('total/customer/:agencyId')
  @ApiResponseDocument(
    HttpStatus.OK,
    TotalCustomerResponse,
    'Get total customer success',
  )
  @ApiOperation({ summary: 'Get total customer' })
  async getTotalCustomer(@Param('agencyId', ParseIntPipe) agencyId: number) {
    const data = await this.dashboardService.getTotalCustomer(agencyId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Get total customer success',
      data: data,
    };
  }

  @Get('chart/customer-contract/:agencyId')
  @ApiResponseDocumentArray(
    HttpStatus.OK,
    ContractDataChartResponse,
    'Get chart customer contract data success',
  )
  @ApiQuery({ name: 'year', example: 2025 })
  @ApiOperation({ summary: 'Get chart customer contract data' })
  async getCustomerContractChart(
    @Param('agencyId', ParseIntPipe) agencyId: number,
    @TotalContractChartQuery()
    totalContractChartQueries: TotalContractChartQueries,
  ) {
    const data = await this.dashboardService.getTotalContractStatusChart(
      agencyId,
      totalContractChartQueries,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Get chart customer contract success',
      data: data,
    };
  }

  @Get('total/revenue/:agencyId')
  @ApiOperation({ summary: 'Get total revenue of agency' })
  @ApiResponseDocument(
    HttpStatus.OK,
    TotalRevenueAgencyResponse,
    'Get total revenue agency success',
  )
  async getTotalAgencyRevenue(
    @Param('agencyId', ParseIntPipe) agencyId: number,
  ) {
    const data = await this.dashboardService.getTotalRevenueAgency(agencyId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Get total revenue agency success',
      data: data,
    };
  }

  @Get('list/staff/revenue/:agencyId')
  @ApiOperation({ summary: 'Get list staff revenue' })
  @ApiQueriesAndPagination()
  @ApiResponseDocumentPagination(
    HttpStatus.OK,
    StaffContractRevenue,
    'Get list staff revenue success',
  )
  async getListStaffRevenue(
    @Param('agencyId', ParseIntPipe) agencyId: number,
    @StaffRevenueContractQuery()
    staffRevenueContractQueries: StaffRevenueQueries,
  ) {
    const data = await this.dashboardService.getListStaffRevenue(
      agencyId,
      staffRevenueContractQueries,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Get list staff revenue success',
      data: data.data,
      paginationInfo: data.paginationInfo,
    };
  }
}
