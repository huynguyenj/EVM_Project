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
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/types/role.enum';
import { OrderRestockService } from './order-restock.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CreateBillOrder,
  CreateOrderDto,
  OrderBillResponseDto,
  OrderDetailResponseDto,
  OrderQueries,
  OrderResponseDto,
} from './dto';
import {
  ApiQueriesAndPagination,
  ApiResponseDocument,
} from 'src/common/decorator';
import { ApiResponseDocumentPagination } from 'src/common/decorator/swagger-decorator/api.response.document.pagination';
import { OrderStatus } from './types';
import { OrderStockQuery } from './decorators';

@Controller('order-restock')
@ApiTags('Dealer manager - Order restock')
@ApiBearerAuth('access-token')
@Roles(Role.DEALER_MANAGER)
export class OrderRestockController {
  constructor(private orderRestockService: OrderRestockService) {}

  @Post()
  @ApiOperation({ summary: 'Create order restock' })
  @ApiResponseDocument(
    HttpStatus.CREATED,
    OrderResponseDto,
    'Create order restock successfully!',
  )
  async createOrderRestock(@Body() createOrderDto: CreateOrderDto) {
    const data =
      await this.orderRestockService.createOrderRestock(createOrderDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Create order restock successfully!',
      data: data,
    };
  }
  @Get('detail/:orderId')
  @ApiOperation({ summary: 'Get order restock detail' })
  @ApiResponseDocument(
    HttpStatus.OK,
    OrderDetailResponseDto,
    'Get order restock detail successfully',
  )
  async getOrderRestockDetail(@Param('orderId', ParseIntPipe) orderId: number) {
    const data = await this.orderRestockService.getOrderDetail(orderId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Get order restock detail successfully!',
      data: data,
    };
  }

  @Get('list/:agencyId')
  @ApiOperation({ summary: 'Get list order restock' })
  @ApiResponseDocumentPagination(
    HttpStatus.OK,
    OrderResponseDto,
    'Get list orders restock successfully!',
  )
  @ApiQueriesAndPagination({
    name: 'status',
    example: OrderStatus.DRAFT,
    required: false,
  })
  async getOrderRestockList(
    @Param('agencyId', ParseIntPipe) agencyId: number,
    @OrderStockQuery() orderQueries: OrderQueries,
  ) {
    const listData = await this.orderRestockService.getListOrdersAgency(
      agencyId,
      orderQueries,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Get list orders restock successfully!',
      data: listData.listData,
      paginationInfo: listData.paginationInfo,
    };
  }

  @Patch('accept/:orderId')
  @ApiOperation({ summary: 'Accept order restock information' })
  @ApiResponseDocument(
    HttpStatus.OK,
    OrderResponseDto,
    'Accept order restock information successfully',
  )
  async updateOrderRestockStatus(
    @Param('orderId', ParseIntPipe) orderId: number,
  ) {
    const updatedData =
      await this.orderRestockService.updateOrderStatusToPending(orderId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Accept order restock information successfully!',
      data: updatedData,
    };
  }

  @Delete(':orderId')
  @ApiOperation({ summary: 'Delete order restock information' })
  @ApiResponseDocument(
    HttpStatus.OK,
    Object,
    'Delete order restock information successfully',
  )
  async cancelOrderRestockStatus(
    @Param('orderId', ParseIntPipe) orderId: number,
  ) {
    await this.orderRestockService.deleteOrder(orderId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Delete order restock information successfully!',
      data: {},
    };
  }

  @Post('bill/:orderId')
  @ApiOperation({ summary: 'Create bill for order restock' })
  @ApiResponseDocument(
    HttpStatus.CREATED,
    OrderBillResponseDto,
    'Create order restock bill successfully!',
  )
  async createOrderRestockBill(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body() createBillDto: CreateBillOrder,
  ) {
    const createdData = await this.orderRestockService.createOrderBill(
      orderId,
      createBillDto,
    );
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Create bill for order restock successfully!',
      data: createdData,
    };
  }
}
