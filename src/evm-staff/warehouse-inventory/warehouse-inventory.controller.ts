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

@Controller('inventory')
@ApiBearerAuth('access-token')
@ApiTags('Admin & EVM Staff - Inventory Management')
@Roles(Role.ADMIN, Role.EVM_STAFF)
export class WarehouseInventoryController {
  constructor(private inventoryService: WarehouseInventoryService) {}

  @Post(':motorbikeId/:warehouseId')
  @ApiResponseDocument(
    HttpStatus.CREATED,
    InventoryResponseDto,
    'Create inventory successfully!',
  )
  @ApiOperation({ summary: 'Create inventory for warehouse' })
  async createInventory(
    @Param('motorbikeId', ParseIntPipe) motorbikeId: number,
    @Param('warehouseId', ParseIntPipe) warehouseId: number,
    @Body() createInventoryDto: CreateInventoryDto,
  ) {
    const createdData = await this.inventoryService.createInventory(
      motorbikeId,
      warehouseId,
      createInventoryDto,
    );
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Create inventory successfully!',
      data: createdData,
    };
  }

  @Get()
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

  @Get(':motorbikeId/:warehouseId')
  @ApiResponseDocument(
    HttpStatus.OK,
    InventoryDetailResponseDto,
    'Create inventory successfully!',
  )
  @ApiOperation({ summary: 'Get inventory detail' })
  async getInventoryDetail(
    @Param('motorbikeId', ParseIntPipe) motorbikeId: number,
    @Param('warehouseId', ParseIntPipe) warehouseId: number,
  ) {
    const data = await this.inventoryService.getInventoryDetail(
      motorbikeId,
      warehouseId,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Get inventory detail',
      data: data,
    };
  }

  @Patch(':motorbikeId/:warehouseId')
  @ApiResponseDocument(
    HttpStatus.OK,
    InventoryResponseDto,
    'Update inventory successfully!',
  )
  @ApiOperation({ summary: 'Update inventory for warehouse' })
  async updateInventory(
    @Param('motorbikeId', ParseIntPipe) motorbikeId: number,
    @Param('warehouseId', ParseIntPipe) warehouseId: number,
    @Body() updateInventoryDto: UpdateInventoryDto,
  ) {
    const updateData = await this.inventoryService.updateInventory(
      motorbikeId,
      warehouseId,
      updateInventoryDto,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Update inventory successfully!',
      data: updateData,
    };
  }

  @Delete(':motorbikeId/:warehouseId')
  @ApiResponseDocument(HttpStatus.OK, Object, 'Delete inventory successfully!')
  @ApiOperation({ summary: 'Delete inventory' })
  async deleteInventory(
    @Param('motorbikeId', ParseIntPipe) motorbikeId: number,
    @Param('warehouseId', ParseIntPipe) warehouseId: number,
  ) {
    await this.inventoryService.deleteInventory(motorbikeId, warehouseId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Delete inventory successfully!',
      data: {},
    };
  }
}
