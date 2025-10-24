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
import { DiscountService } from './discount.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/types/role.enum';
import {
  ApiQueriesAndPagination,
  ApiResponseDocument,
} from 'src/common/decorator';
import {
  CreateDiscountDto,
  DiscountDetailResponseDto,
  DiscountQueries,
  DiscountResponseDto,
  UpdateDiscountDto,
} from './dto';
import { ApiResponseDocumentPagination } from 'src/common/decorator/swagger-decorator/api.response.document.pagination';
import { DiscountQuery } from './decorators';
import { DiscountStatus, DiscountType, ValueType } from './types';

@Controller('discount')
@ApiBearerAuth('access-token')
@ApiTags('Admin & EVM Staff - Discount Management')
@Roles(Role.ADMIN, Role.EVM_STAFF)
export class DiscountController {
  constructor(private discountService: DiscountService) {}

  @Post()
  @ApiResponseDocument(
    HttpStatus.CREATED,
    DiscountResponseDto,
    'Create discount successfully!',
  )
  @ApiOperation({ summary: 'Create discount' })
  async createDiscount(@Body() createDiscountDto: CreateDiscountDto) {
    const createdData =
      await this.discountService.createDiscount(createDiscountDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Create discount successfully!',
      data: createdData,
    };
  }

  @Get('list')
  @ApiOperation({ summary: 'Get discount list' })
  @ApiQueriesAndPagination(
    { name: 'type', example: DiscountType.VOLUME, required: false },
    { name: 'valueType', example: ValueType.FIXED, required: false },
    { name: 'agencyId', example: 1, required: false },
    { name: 'motorbikeId', example: 1, required: false },
    { name: 'status', example: DiscountStatus.ACTIVE, required: false },
  )
  @ApiResponseDocumentPagination(
    HttpStatus.OK,
    DiscountResponseDto,
    'Get discount list successfully',
  )
  async getDiscountList(@DiscountQuery() discountQueries: DiscountQueries) {
    const dataList =
      await this.discountService.getListDiscount(discountQueries);
    return {
      statusCode: HttpStatus.OK,
      message: 'Get discount list successfully!',
      data: dataList.data,
      paginationInfo: dataList.paginationInfo,
    };
  }

  @Get('agency/list/:agencyId')
  @Roles(Role.DEALER_MANAGER)
  @ApiOperation({ summary: 'Get discount list for agency' })
  @ApiQueriesAndPagination(
    { name: 'type', example: 'special', required: false },
    { name: 'valueType', example: 'percent', required: false },
  )
  @ApiResponseDocumentPagination(
    HttpStatus.OK,
    DiscountResponseDto,
    'Get agency discount list successfully',
  )
  async getAgencyDiscountList(
    @Param('agencyId', ParseIntPipe) agencyId: number,
    @DiscountQuery() discountQueries: DiscountQueries,
  ) {
    const dataList = await this.discountService.getAgencyDiscounts(
      agencyId,
      discountQueries,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Get discount list successfully!',
      data: dataList.data,
      paginationInfo: dataList.paginationInfo,
    };
  }

  @Get('agency/motorbike/list/:motorbikeId')
  @Roles(Role.DEALER_MANAGER)
  @ApiOperation({ summary: 'Get motorbike discount list for agency' })
  @ApiQueriesAndPagination(
    { name: 'type', example: 'special', required: false },
    { name: 'valueType', example: 'percent', required: false },
  )
  @ApiResponseDocumentPagination(
    HttpStatus.OK,
    DiscountResponseDto,
    'Get motorbike discount list for agency successfully',
  )
  async getMotorbikeDiscountList(
    @Param('motorbikeId', ParseIntPipe) motorbikeId: number,
    @DiscountQuery() discountQueries: DiscountQueries,
  ) {
    const dataList = await this.discountService.getMotorbikeDiscountsGlobal(
      motorbikeId,
      discountQueries,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Get motorbike discount list successfully!',
      data: dataList.data,
      paginationInfo: dataList.paginationInfo,
    };
  }

  @Get('detail/:discountId')
  @ApiResponseDocument(
    HttpStatus.OK,
    DiscountDetailResponseDto,
    'Get discount detail successfully!',
  )
  @ApiOperation({ summary: 'Get discount detail' })
  async getDiscountDetail(
    @Param('discountId', ParseIntPipe) discountId: number,
  ) {
    const data = await this.discountService.getDiscountDetail(discountId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Get discount detail successfully!',
      data: data,
    };
  }

  @Patch(':discountId')
  @ApiResponseDocument(
    HttpStatus.OK,
    DiscountResponseDto,
    'Update discount successfully!',
  )
  @ApiOperation({ summary: 'Update discount' })
  async updateDiscount(
    @Param('discountId', ParseIntPipe) discountId: number,
    @Body() updateDiscountDto: UpdateDiscountDto,
  ) {
    const updateData = await this.discountService.updateDiscount(
      discountId,
      updateDiscountDto,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Update discount successfully!',
      data: updateData,
    };
  }

  @Delete(':discountId')
  @ApiResponseDocument(HttpStatus.OK, Object, 'Delete discount successfully!')
  @ApiOperation({ summary: 'Delete discount' })
  async deleteDiscount(@Param('discountId', ParseIntPipe) discountId: number) {
    await this.discountService.deleteDiscount(discountId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Delete discount successfully!',
      data: {},
    };
  }
}
