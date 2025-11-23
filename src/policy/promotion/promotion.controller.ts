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
import { PromotionService } from './promotion.service';
import {
  ApiQueriesAndPagination,
  ApiResponseDocument,
} from 'src/common/decorator';
import {
  CreatePromotionDto,
  PromotionQueries,
  PromotionResponseDto,
  UpdatePromotionDto,
} from './dto';
import { ApiResponseDocumentPagination } from 'src/common/decorator/swagger-decorator/api.response.document.pagination';
import { PromotionQuery } from './decorators';
import { PromotionStatus, PromotionValueType } from './types';

@Controller('promotion')
@ApiBearerAuth('access-token')
@ApiTags('Admin & EVM Staff - Promotion Management')
@Roles(Role.ADMIN, Role.EVM_STAFF)
export class PromotionController {
  constructor(private promotionService: PromotionService) {}

  @Post()
  @ApiResponseDocument(
    HttpStatus.CREATED,
    PromotionResponseDto,
    'Create promotion successfully!',
  )
  @ApiOperation({ summary: 'Create Promotion' })
  async createPromotion(@Body() createPromotionDto: CreatePromotionDto) {
    const createdData =
      await this.promotionService.createPromotion(createPromotionDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Create promotion successfully!',
      data: createdData,
    };
  }

  @Get('/list')
  @ApiOperation({ summary: 'Get promotion list' })
  @ApiQueriesAndPagination(
    {
      name: 'valueType',
      example: PromotionValueType.FIXED,
      required: false,
    },
    { name: 'motorbikeId', example: 1, required: false },
    { name: 'status', example: PromotionStatus.ACTIVE, required: false },
  )
  @ApiResponseDocumentPagination(
    HttpStatus.OK,
    PromotionResponseDto,
    'Get promotion list successfully',
  )
  async getPromotionList(@PromotionQuery() promotionQueries: PromotionQueries) {
    const dataList =
      await this.promotionService.getListPromotion(promotionQueries);
    return {
      statusCode: HttpStatus.OK,
      message: 'Get promotion list successfully!',
      data: dataList.data,
      paginationInfo: dataList.paginationInfo,
    };
  }

  @Get('agency/list')
  @Roles(Role.DEALER_MANAGER)
  @ApiOperation({ summary: 'Get promotion list for agency' })
  @ApiQueriesAndPagination(
    {
      name: 'valueType',
      example: 'percent',
      required: false,
    },
    { name: 'motorbikeId', example: 1, required: false },
  )
  @ApiResponseDocumentPagination(
    HttpStatus.OK,
    PromotionResponseDto,
    'Get promotion list for agency successfully',
  )
  async getAgencyPromotionList(
    @PromotionQuery() PromotionQueries: PromotionQueries,
  ) {
    const dataList =
      await this.promotionService.getPromotionsAgency(PromotionQueries);
    return {
      statusCode: HttpStatus.OK,
      message: 'Get promotion list for agency successfully!',
      data: dataList.data,
      paginationInfo: dataList.paginationInfo,
    };
  }

  @Get('agency/list/with-motorbike/:motorbikeId')
  @Roles(Role.DEALER_MANAGER)
  @ApiOperation({
    summary: 'Get list promotion for specific motorbike for agency',
  })
  @ApiQueriesAndPagination({
    name: 'valueType',
    example: 'percent',
    required: false,
  })
  @ApiResponseDocumentPagination(
    HttpStatus.OK,
    PromotionResponseDto,
    'Get promotion list for agency successfully',
  )
  async getMotorbikePromotionList(
    @Param('motorbikeId', ParseIntPipe) motorbikeId: number,
    @PromotionQuery() promotionQueries: PromotionQueries,
  ) {
    const dataList = await this.promotionService.getPromotionsWithMotorbike(
      motorbikeId,
      promotionQueries,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Get promotion list for agency successfully!',
      data: dataList.data,
      paginationInfo: dataList.paginationInfo,
    };
  }

  @Get('detail/:promotionId')
  @ApiResponseDocument(
    HttpStatus.OK,
    PromotionResponseDto,
    'Get promotion detail successfully!',
  )
  @ApiOperation({ summary: 'Get Promotion detail' })
  async getPromotionDetail(
    @Param('promotionId', ParseIntPipe) promotionId: number,
  ) {
    const data = await this.promotionService.getPromotionDetail(promotionId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Get promotion detail successfully!',
      data: data,
    };
  }

  @Patch('expiration-validation')
  @ApiResponseDocument(
    HttpStatus.OK,
    Object,
    'Update promotion expiration successfully!',
  )
  @ApiOperation({ summary: 'Update promotion expiration' })
  async updatePromotionExpiration() {
    await this.promotionService.checkExpiredPromotion();
    return {
      statusCode: HttpStatus.OK,
      message: 'Update promotion expiration successfully!',
      data: {},
    };
  }

  @Patch(':promotionId')
  @ApiResponseDocument(
    HttpStatus.OK,
    PromotionResponseDto,
    'Update promotion successfully!',
  )
  @ApiOperation({ summary: 'Update promotion' })
  async updatePromotion(
    @Param('promotionId', ParseIntPipe) promotionId: number,
    @Body() updatePromotionDto: UpdatePromotionDto,
  ) {
    const updateData = await this.promotionService.updatePromotion(
      promotionId,
      updatePromotionDto,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Update Promotion successfully!',
      data: updateData,
    };
  }

  @Delete(':promotionId')
  @ApiResponseDocument(HttpStatus.OK, Object, 'Delete promotion successfully!')
  @ApiOperation({ summary: 'Delete promotion' })
  async deletePromotion(
    @Param('promotionId', ParseIntPipe) promotionId: number,
  ) {
    await this.promotionService.deletePromotion(promotionId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Delete promotion successfully!',
      data: {},
    };
  }
}
