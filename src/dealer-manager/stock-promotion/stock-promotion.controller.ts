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
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/types/role.enum';
import { StockPromotionService } from './stock-promotion.service';
import {
  ApiQueriesAndPagination,
  ApiResponseDocument,
} from 'src/common/decorator';
import {
  AssignStockPromotionDto,
  CreateStockPromotionDto,
  StockPromotionQueries,
  StockPromotionResponseDto,
  UpdateStockPromotionDto,
} from './dto';
import { StockPromotionStatus, StockPromotionValueType } from './types';
import { ApiResponseDocumentPagination } from 'src/common/decorator/swagger-decorator/api.response.document.pagination';
import { StockPromotionQuery } from './decorators';
import { StockPromotionDetailResponseDto } from './dto/response/stock-promotion-detail-response';

@Controller('stock-promotion')
@ApiBearerAuth('access-token')
@ApiTags('Dealer Manager - Stock promotion management')
@Roles(Role.DEALER_MANAGER)
export class StockPromotionController {
  constructor(private stockPromotionService: StockPromotionService) {}

  @Post()
  @ApiResponseDocument(
    HttpStatus.CREATED,
    StockPromotionResponseDto,
    'Create stock promotion successfully!',
  )
  @ApiOperation({ summary: 'Create promotion for stock' })
  async createStockPromotion(
    @Body() createPromotionDto: CreateStockPromotionDto,
  ) {
    const createdData =
      await this.stockPromotionService.createStockPromotion(createPromotionDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Create stock promotion successfully!',
      data: createdData,
    };
  }

  @Post('assignment')
  @ApiOperation({ summary: 'Apply promotion for stocks' })
  @ApiResponseDocument(HttpStatus.ACCEPTED, Object, 'Apply promotion to stock')
  async assignPromotionStock(
    @Body() assignPromotionStockDto: AssignStockPromotionDto,
  ) {
    console.log(assignPromotionStockDto);
    await this.stockPromotionService.assignPromotionToStock(
      assignPromotionStockDto,
    );
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Assign promotion for stock success',
      data: {},
    };
  }

  @Get('/list/:agencyId')
  @ApiOperation({ summary: 'Get stock promotion list' })
  @ApiQueriesAndPagination(
    {
      name: 'valueType',
      example: StockPromotionValueType.FIXED,
      required: false,
    },
    { name: 'status', example: StockPromotionStatus.ACTIVE, required: false },
  )
  @ApiResponseDocumentPagination(
    HttpStatus.OK,
    StockPromotionResponseDto,
    'Get stock promotion list successfully',
  )
  async getStockPromotionList(
    @Param('agencyId', ParseIntPipe) agencyId: number,
    @StockPromotionQuery() stockPromotionQueries: StockPromotionQueries,
  ) {
    const dataList = await this.stockPromotionService.getListStockPromotion(
      agencyId,
      stockPromotionQueries,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Get stock promotion list successfully!',
      data: dataList.data,
      paginationInfo: dataList.paginationInfo,
    };
  }

  @Get('/list/staff/:agencyId')
  @ApiOperation({ summary: 'Get stock promotion list for staff' })
  @ApiQueriesAndPagination({
    name: 'valueType',
    example: StockPromotionValueType.FIXED,
    required: false,
  })
  @ApiResponseDocumentPagination(
    HttpStatus.OK,
    StockPromotionResponseDto,
    'Get stock promotion list successfully',
  )
  async getStockPromotionListForStaff(
    @Param('agencyId', ParseIntPipe) agencyId: number,
    @StockPromotionQuery() stockPromotionQueries: StockPromotionQueries,
  ) {
    const dataList =
      await this.stockPromotionService.getListStockPromotionForStaff(
        agencyId,
        stockPromotionQueries,
      );
    return {
      statusCode: HttpStatus.OK,
      message: 'Get stock promotion list for staff successfully!',
      data: dataList.data,
      paginationInfo: dataList.paginationInfo,
    };
  }

  @Get('detail/:stockPromotionId')
  @ApiResponseDocument(
    HttpStatus.OK,
    StockPromotionDetailResponseDto,
    'Get stock promotion detail successfully!',
  )
  @ApiOperation({ summary: 'Get stock promotion detail' })
  async getStockPromotionDetail(
    @Param('stockPromotionId', ParseIntPipe) stockPromotionId: number,
  ) {
    const data =
      await this.stockPromotionService.getStockPromotionDetail(
        stockPromotionId,
      );
    return {
      statusCode: HttpStatus.OK,
      message: 'Get stock promotion detail successfully!',
      data: data,
    };
  }

  @Patch(':stockPromotionId')
  @ApiResponseDocument(
    HttpStatus.OK,
    StockPromotionResponseDto,
    'Update stock promotion successfully!',
  )
  @ApiOperation({ summary: 'Update stock promotion' })
  async updatePromotion(
    @Param('stockPromotionId', ParseIntPipe) stockPromotionId: number,
    @Body() updatePromotionDto: UpdateStockPromotionDto,
  ) {
    const updateData = await this.stockPromotionService.updateStockPromotion(
      stockPromotionId,
      updatePromotionDto,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Update stock promotion successfully!',
      data: updateData,
    };
  }

  @Patch('expiration/:agencyId')
  @ApiResponseDocument(
    HttpStatus.OK,
    Object,
    'Update stock promotion status successfully!',
  )
  @ApiOperation({ summary: 'Update stock promotion status' })
  async updateStockPromotionExpired(
    @Param('agencyId', ParseIntPipe) agencyId: number,
  ) {
    await this.stockPromotionService.checkStockPromotionExpired(agencyId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Update stock promotion status successfully!',
      data: {},
    };
  }

  @Delete(':stockPromotionId')
  @ApiResponseDocument(
    HttpStatus.OK,
    Object,
    'Delete stock promotion successfully!',
  )
  @ApiOperation({ summary: 'Delete promotion' })
  async deletePromotion(
    @Param('stockPromotionId', ParseIntPipe) stockPromotionId: number,
  ) {
    await this.stockPromotionService.deleteStockPromotion(stockPromotionId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Delete promotion successfully!',
      data: {},
    };
  }
}
