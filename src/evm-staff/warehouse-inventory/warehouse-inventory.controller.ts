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
import { WarehouseInventoryService } from './warehouse-inventory.service';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/types/role.enum';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  ApiQueriesAndPagination,
  ApiResponseDocument,
  ApiResponseDocumentArray,
} from 'src/common/decorator';
import {
  CreateInventoryDto,
  InventoryDetailResponseDto,
  InventoryQuery,
  InventoryResponseDto,
  UpdateInventoryDto,
} from './dto';
import { ApiResponseDocumentPagination } from 'src/common/decorator/swagger-decorator/api.response.document.pagination';
import { InventoryDecorator } from './decorators';
import { WarehouseResponseDto } from 'src/admin/warehouses/dto';

@Controller('inventory')
@ApiBearerAuth('access-token')
@ApiTags('Admin & EVM Staff - Inventory Management')
@Roles(Role.ADMIN, Role.EVM_STAFF)
export class WarehouseInventoryController {
  constructor(private inventoryService: WarehouseInventoryService) {}

  @Post(':motorbikeId/:warehouseId/:colorId')
  @ApiResponseDocument(
    HttpStatus.CREATED,
    InventoryResponseDto,
    'Create inventory successfully!',
  )
  @ApiOperation({ summary: 'Create inventory for warehouse' })
  async createInventory(
    @Param('motorbikeId', ParseIntPipe) motorbikeId: number,
    @Param('warehouseId', ParseIntPipe) warehouseId: number,
    @Param('colorId', ParseIntPipe) colorId: number,
    @Body() createInventoryDto: CreateInventoryDto,
  ) {
    const createdData = await this.inventoryService.createInventory(
      motorbikeId,
      warehouseId,
      colorId,
      createInventoryDto,
    );
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Create inventory successfully!',
      data: createdData,
    };
  }

  @Get('list')
  @ApiOperation({ summary: 'Get inventory list' })
  @ApiQueriesAndPagination()
  @ApiResponseDocumentPagination(
    HttpStatus.OK,
    InventoryResponseDto,
    'Get inventory list successfully',
  )
  async getInventoryList(@InventoryDecorator() inventoryQuery: InventoryQuery) {
    const dataList =
      await this.inventoryService.getListInventory(inventoryQuery);
    return {
      statusCode: HttpStatus.OK,
      message: 'Get inventory list successfully!',
      data: dataList.data,
      paginationInfo: dataList.paginationInfo,
    };
  }

  @Get('list/warehouse/:motorbikeId')
  @Roles(Role.DEALER_STAFF, Role.DEALER_MANAGER)
  @ApiOperation({ summary: 'Get warehouse by motorbikeId' })
  @ApiResponseDocumentArray(
    HttpStatus.OK,
    WarehouseResponseDto,
    'Get list warehouse by motorbikeId successfully',
  )
  async getListWarehouseByMotorbikeId(
    @Param('motorbikeId', ParseIntPipe) motorbikeId: number,
  ) {
    const dataList =
      await this.inventoryService.getListWarehouseByMotorbikeId(motorbikeId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Get list warehouse by motorbikeId successfully',
      data: dataList,
    };
  }

  @Get('detail/:motorbikeId/:warehouseId/:colorId')
  @ApiResponseDocument(
    HttpStatus.OK,
    InventoryDetailResponseDto,
    'Get inventory detail successfully!',
  )
  @ApiOperation({ summary: 'Get inventory detail' })
  async getInventoryDetail(
    @Param('motorbikeId', ParseIntPipe) motorbikeId: number,
    @Param('warehouseId', ParseIntPipe) warehouseId: number,
    @Param('colorId', ParseIntPipe) colorId: number,
  ) {
    const data = await this.inventoryService.getInventoryDetail(
      motorbikeId,
      warehouseId,
      colorId,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Get inventory detail',
      data: data,
    };
  }

  @Patch(':motorbikeId/:warehouseId:colorId')
  @ApiResponseDocument(
    HttpStatus.OK,
    InventoryResponseDto,
    'Update inventory successfully!',
  )
  @ApiOperation({ summary: 'Update inventory for warehouse' })
  async updateInventory(
    @Param('motorbikeId', ParseIntPipe) motorbikeId: number,
    @Param('warehouseId', ParseIntPipe) warehouseId: number,
    @Param('colorId', ParseIntPipe) colorId: number,
    @Body() updateInventoryDto: UpdateInventoryDto,
  ) {
    const updateData = await this.inventoryService.updateInventory(
      motorbikeId,
      warehouseId,
      colorId,
      updateInventoryDto,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Update inventory successfully!',
      data: updateData,
    };
  }

  @Delete(':motorbikeId/:warehouseId/:colorId')
  @ApiResponseDocument(HttpStatus.OK, Object, 'Delete inventory successfully!')
  @ApiOperation({ summary: 'Delete inventory' })
  async deleteInventory(
    @Param('motorbikeId', ParseIntPipe) motorbikeId: number,
    @Param('warehouseId', ParseIntPipe) warehouseId: number,
    @Param('colorId', ParseIntPipe) colorId: number,
  ) {
    await this.inventoryService.deleteInventory(
      motorbikeId,
      warehouseId,
      colorId,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Delete inventory successfully!',
      data: {},
    };
  }
}
