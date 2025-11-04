import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/types/role.enum';
import { OrderRestockManagementService } from './order-restock-management.service';
import { ApiResponseDocumentPagination } from 'src/common/decorator/swagger-decorator/api.response.document.pagination';
import {
  OrderItemManageDetailResponse,
  OrderManageDetailResponseDto,
  OrderManageQueries,
  OrderManageResponseDto,
  UpdateOrderStock,
} from './dto';
import {
  ApiQueriesAndPagination,
  ApiResponseDocument,
} from 'src/common/decorator';
import { OrderStatus } from 'src/dealer-manager/order-restock/types';
import { OrderStockManageQuery } from './decorators';

@Controller('order-restock-management')
@ApiTags('Admin & EVM Staff - Order restock management')
@ApiBearerAuth('access-token')
@Roles(Role.ADMIN, Role.EVM_STAFF)
export class OrderRestockManagementController {
  constructor(private orderManageService: OrderRestockManagementService) {}

  @Get('list')
  @ApiOperation({ summary: 'Get list orders' })
  @ApiResponseDocumentPagination(
    HttpStatus.OK,
    OrderManageResponseDto,
    'Get list orders successfully!',
  )
  @ApiQueriesAndPagination(
    { name: 'status', example: OrderStatus.PENDING, required: false },
    { name: 'agencyId', example: 1, required: false },
  )
  async getListOrder(
    @OrderStockManageQuery() orderQueries: OrderManageQueries,
  ) {
    const listData = await this.orderManageService.getListOrder(orderQueries);
    return {
      statusCode: HttpStatus.OK,
      message: 'Get list orders successfully!',
      data: listData.listData,
      paginationInfo: listData.paginationInfo,
    };
  }

  @Get('detail/:orderId')
  @ApiOperation({ summary: 'Get order detail' })
  @ApiResponseDocument(
    HttpStatus.OK,
    OrderManageDetailResponseDto,
    'Get order detail successfully!',
  )
  async getOrderDetail(@Param('orderId', ParseIntPipe) orderId: number) {
    const data = await this.orderManageService.getOrderRestockDetail(orderId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Get order detail successfully!',
      data: data,
    };
  }

  @Get('detail/order-item/:orderItemId')
  @ApiOperation({ summary: 'Get order item detail' })
  @ApiResponseDocument(
    HttpStatus.OK,
    OrderItemManageDetailResponse,
    'Get order detail successfully!',
  )
  async getOrderItemDetail(
    @Param('orderItemId', ParseIntPipe) orderItemId: number,
  ) {
    const data = await this.orderManageService.getOrderItemDetail(orderItemId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Get order item detail successfully!',
      data: data,
    };
  }

  @Patch('status/:orderId')
  @ApiOperation({ summary: 'Update order status' })
  @ApiResponseDocument(
    HttpStatus.OK,
    OrderManageResponseDto,
    'Update order status successfully!',
  )
  async updateOrderStatus(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body() updateOrderDto: UpdateOrderStock,
  ) {
    const updatedData = await this.orderManageService.updateStatusOrder(
      orderId,
      updateOrderDto,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Update order status successfully!',
      data: updatedData,
    };
  }

  @Delete(':orderId')
  @ApiOperation({ summary: 'Delete order' })
  @ApiResponseDocument(HttpStatus.OK, Object, 'Delete order successfully!')
  async deleteOrder(@Param('orderId', ParseIntPipe) orderId: number) {
    await this.orderManageService.deleteOrder(orderId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Delete order successfully!',
      data: {},
    };
  }
}
