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
import { PriceService } from './price.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/types/role.enum';
import {
  ApiQueriesAndPagination,
  ApiResponseDocument,
} from 'src/common/decorator';
import {
  CreatePriceDto,
  PriceQueries,
  PriceResponseDto,
  UpdatePriceDto,
} from './dto';
import { ApiResponseDocumentPagination } from 'src/common/decorator/swagger-decorator/api.response.document.pagination';
import { PriceQuery } from './decorators';

@Controller('price')
@ApiBearerAuth('access-token')
@ApiTags('Admin & EVM Staff - Price policy Management')
@Roles(Role.ADMIN, Role.EVM_STAFF)
export class PriceController {
  constructor(private pricePolicyService: PriceService) {}

  @Post()
  @ApiOperation({ summary: 'Create price policy' })
  @ApiResponseDocument(
    HttpStatus.CREATED,
    PriceResponseDto,
    'Create price policy success!',
  )
  async createPricePolicy(@Body() createPricePolicy: CreatePriceDto) {
    const createdData =
      await this.pricePolicyService.createPrice(createPricePolicy);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Create price policy success',
      data: createdData,
    };
  }

  @Get('list')
  @ApiOperation({ summary: 'Get list price policies ' })
  @ApiQueriesAndPagination()
  @ApiResponseDocumentPagination(
    HttpStatus.OK,
    PriceResponseDto,
    'Get list price policies success!',
  )
  async getListPolicies(@PriceQuery() priceQueries: PriceQueries) {
    const listData =
      await this.pricePolicyService.getListPricePolicies(priceQueries);
    return {
      statusCode: HttpStatus.OK,
      message: 'Get list price policies success',
      data: listData.data,
      pagination: listData.paginationInfo,
    };
  }

  @Get('detail/:pricePolicyId')
  @ApiOperation({ summary: 'Get price policy detail' })
  @ApiResponseDocument(
    HttpStatus.OK,
    PriceResponseDto,
    'Get price policy detail success!',
  )
  async getPricePolicyDetail(
    @Param('pricePolicyId', ParseIntPipe) pricePolicyId: number,
  ) {
    const data =
      await this.pricePolicyService.getPricePolicyDetail(pricePolicyId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Get price policy detail success',
      data: data,
    };
  }

  @Patch(':pricePolicyId')
  @ApiOperation({ summary: 'Update price policy' })
  @ApiResponseDocument(
    HttpStatus.OK,
    PriceResponseDto,
    'Update price policy success!',
  )
  async updatePricePolicy(
    @Param('pricePolicyId', ParseIntPipe) pricePolicyId: number,
    @Body() updatePricePolicy: UpdatePriceDto,
  ) {
    const data = await this.pricePolicyService.updatePricePolicy(
      pricePolicyId,
      updatePricePolicy,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Update price policy success',
      data: data,
    };
  }

  @Delete(':pricePolicyId')
  @ApiOperation({ summary: 'Get price policy detail' })
  @ApiResponseDocument(
    HttpStatus.OK,
    Object,
    'Get price policy detail success!',
  )
  async deletePricePolicy(
    @Param('pricePolicyId', ParseIntPipe) pricePolicyId: number,
  ) {
    await this.pricePolicyService.deletePricePolicy(pricePolicyId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Delete price policy success',
      data: {},
    };
  }
}
