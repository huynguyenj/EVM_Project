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
import { WarehousesService } from './warehouses.service';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/types/role.enum';
import {
  CreateWarehouseDto,
  UpdateWarehouseDto,
  WarehouseQueries,
  WarehouseResponseDto,
} from './dto';
import {
  ApiQueriesAndPagination,
  ApiResponseDocument,
} from 'src/common/decorator';
import { ApiResponseDocumentPagination } from 'src/common/decorator/swagger-decorator/api.response.document.pagination';
import { WarehouseQuery } from './decorators';

@Controller('warehouses')
@Roles(Role.ADMIN, Role.EVM_STAFF)
@ApiTags('Admin & EVM Staff - Warehouse Management')
@ApiBearerAuth('access-token')
export class WarehousesController {
  constructor(private warehouseService: WarehousesService) {}

  @Post()
  @ApiOperation({ summary: 'create warehouse' })
  @ApiResponseDocument(
    HttpStatus.CREATED,
    WarehouseResponseDto,
    'Create warehouse successfully!',
  )
  async createWarehouse(@Body() createWarehouseDto: CreateWarehouseDto) {
    const createdData =
      await this.warehouseService.createWarehouse(createWarehouseDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Create warehouse successfully',
      data: createdData,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get list ware house' })
  @ApiResponseDocumentPagination(
    HttpStatus.OK,
    WarehouseResponseDto,
    'Get list warehouses successfully!',
  )
  @ApiQueriesAndPagination(
    { name: 'location', example: 'USA', required: false },
    { name: 'address', example: 'Washinton', required: false },
  )
  async getListWarehouse(@WarehouseQuery() warehouseQuery: WarehouseQueries) {
    const dataList =
      await this.warehouseService.getWarehouseList(warehouseQuery);
    return {
      statusCode: HttpStatus.OK,
      message: 'Get list warehouses successfully',
      data: dataList.dataList,
      paginationInfo: dataList.paginationInfo,
    };
  }

  @Get(':warehouseId')
  @ApiOperation({ summary: 'Get warehouse detail' })
  @ApiResponseDocument(
    HttpStatus.OK,
    WarehouseResponseDto,
    'Get warehouse detail successfully!',
  )
  async getWarehouseDetail(
    @Param('warehouseId', ParseIntPipe) warehouseId: number,
  ) {
    const data = await this.warehouseService.getWarehouseDetail(warehouseId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Get warehouse detail successfully',
      data: data,
    };
  }

  @Patch(':warehouseId')
  @ApiOperation({ summary: 'Get warehouse detail' })
  @ApiResponseDocument(
    HttpStatus.OK,
    WarehouseResponseDto,
    'Update warehouse successfully!',
  )
  async updateWarehouse(
    @Param('warehouseId', ParseIntPipe) warehouseId: number,
    @Body() warehouseUpdateDto: UpdateWarehouseDto,
  ) {
    const data = await this.warehouseService.updateWarehouse(
      warehouseId,
      warehouseUpdateDto,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Update warehouse successfully!',
      data: data,
    };
  }

  @Delete(':warehouseId')
  @ApiOperation({ summary: 'Delete warehouse' })
  @ApiResponseDocument(HttpStatus.OK, Object, 'Delete warehouse successfully!')
  async deleteWarehouse(
    @Param('warehouseId', ParseIntPipe) warehouseId: number,
  ) {
    await this.warehouseService.deleteWarehouse(warehouseId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Delete warehouse successfully',
      data: {},
    };
  }
}
