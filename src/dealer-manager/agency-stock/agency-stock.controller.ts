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
import { AgencyStockService } from './agency-stock.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  ApiQueriesAndPagination,
  ApiResponseDocument,
} from 'src/common/decorator';
import {
  AgencyStockDetailResponseDto,
  AgencyStockQueries,
  AgencyStockResponse,
  CreateAgencyStockDto,
  UpdateAgencyStockDto,
} from './dto';
import { ApiResponseDocumentPagination } from 'src/common/decorator/swagger-decorator/api.response.document.pagination';
import { AgencyStockQuery } from './decorators';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/types/role.enum';

@Controller('agency-stock')
@ApiBearerAuth('access-token')
@ApiTags('Dealer Manager & Dealer Staff - Stock Management')
@Roles(Role.DEALER_MANAGER, Role.DEALER_STAFF)
export class AgencyStockController {
  constructor(private agencyStockService: AgencyStockService) {}

  @Post()
  @ApiResponseDocument(
    HttpStatus.CREATED,
    AgencyStockResponse,
    'Create agency stock success!',
  )
  @ApiOperation({ summary: 'Create agency stock' })
  async createAgencyStock(@Body() createAgencyStockDto: CreateAgencyStockDto) {
    const createdData =
      await this.agencyStockService.createAgencyStock(createAgencyStockDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Create agency stock success!',
      data: createdData,
    };
  }

  @Get('/list/:agencyId')
  @ApiOperation({ summary: 'Get list stocks' })
  @ApiResponseDocumentPagination(
    HttpStatus.OK,
    AgencyStockResponse,
    'Get list agency stocks success',
  )
  @ApiQueriesAndPagination(
    { name: 'motorbikeId', example: 1, required: false },
    { name: 'colorId', example: 1, required: false },
  )
  async getListAgencyStocks(
    @Param('agencyId', ParseIntPipe) agencyId: number,
    @AgencyStockQuery() agencyQueries: AgencyStockQueries,
  ) {
    const listData = await this.agencyStockService.getListAgencyStock(
      agencyId,
      agencyQueries,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Get list agency stocks success',
      data: listData.data,
      paginationInfo: listData.paginationInfo,
    };
  }

  @Get('detail/:stockId')
  @ApiOperation({ summary: 'Get agency stock detail' })
  @ApiResponseDocument(
    HttpStatus.OK,
    AgencyStockDetailResponseDto,
    'Get agency stock detail success',
  )
  async getAgencyStockDetail(@Param('stockId', ParseIntPipe) stockId: number) {
    const data = await this.agencyStockService.getAgencyStockDetail(stockId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Get agency stock detail success!',
      data: data,
    };
  }

  @Patch(':stockId')
  @ApiOperation({ summary: 'Update agency stock' })
  @ApiResponseDocument(
    HttpStatus.OK,
    AgencyStockResponse,
    'Update agency stock success',
  )
  async updateAgencyStock(
    @Param('stockId', ParseIntPipe) stockId: number,
    @Body() updateAgencyStockDto: UpdateAgencyStockDto,
  ) {
    const updatedData = await this.agencyStockService.updateAgencyStock(
      stockId,
      updateAgencyStockDto,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Update agency stock success!',
      data: updatedData,
    };
  }

  @Delete(':stockId')
  @ApiOperation({ summary: 'Delete agency stock' })
  @ApiResponseDocument(HttpStatus.OK, Object, 'Delete agency stock success')
  async deleteAgencyStock(@Param('stockId', ParseIntPipe) stockId: number) {
    await this.agencyStockService.deleteAgencyStock(stockId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Delete agency stock success!',
      data: {},
    };
  }
}
