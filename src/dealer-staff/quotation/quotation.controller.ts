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
import { QuotationService } from './quotation.service';
import {
  ApiQueriesAndPagination,
  ApiResponseDocument,
} from 'src/common/decorator';
import {
  CreateQuotationDto,
  QuotationDetailResponseDto,
  QuotationQueriesDto,
  QuotationResponseDto,
  UpdateQuotationDto,
} from './dto';
import { QuotationStatus, QuotationType } from './types';
import { ApiResponseDocumentPagination } from 'src/common/decorator/swagger-decorator/api.response.document.pagination';
import { QuotationQuery } from './decorators/quotation-query-decorators';

@Controller('quotation')
@ApiTags('Dealer Staff - Quotation')
@ApiBearerAuth('access-token')
@Roles(Role.DEALER_STAFF)
export class QuotationController {
  constructor(private quotationService: QuotationService) {}

  @Post()
  @ApiResponseDocument(
    HttpStatus.CREATED,
    QuotationResponseDto,
    'Create quotation success',
  )
  @ApiOperation({ summary: 'Create quotation' })
  async createQuotation(@Body() createQuotationDto: CreateQuotationDto) {
    const createdQuotation =
      await this.quotationService.createQuotation(createQuotationDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Create quotation success',
      data: createdQuotation,
    };
  }

  @Get('list/:agencyId')
  @Roles(Role.DEALER_STAFF, Role.DEALER_MANAGER)
  @ApiOperation({ summary: 'Get list quotations' })
  @ApiQueriesAndPagination(
    { name: 'type', example: QuotationType.AT_STORE, required: false },
    { name: 'status', example: QuotationStatus.DRAFT, required: false },
    {
      name: 'quoteCode',
      example: '123e4567-e89b-12d3-a456-426614174000',
      required: false,
    },
  )
  @ApiResponseDocumentPagination(
    HttpStatus.OK,
    QuotationResponseDto,
    'Get list quotations success',
  )
  async getListQuotation(
    @Param('agencyId', ParseIntPipe) agencyId: number,
    @QuotationQuery() quotationQueries: QuotationQueriesDto,
  ) {
    const listQuotations = await this.quotationService.getListQuotation(
      agencyId,
      quotationQueries,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Get list quotations success',
      data: listQuotations.data,
      paginationInfo: listQuotations.paginationInfo,
    };
  }

  @Get('detail/:quotationId')
  @Roles(Role.DEALER_STAFF, Role.DEALER_MANAGER)
  @ApiResponseDocument(
    HttpStatus.OK,
    QuotationDetailResponseDto,
    'Get quotation detail success',
  )
  @ApiOperation({ summary: 'Get quotation detail' })
  async getQuotationDetail(
    @Param('quotationId', ParseIntPipe) quotationId: number,
  ) {
    const quotationDetail =
      await this.quotationService.getQuotationById(quotationId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Get quotation detail success',
      data: quotationDetail,
    };
  }

  @Patch(':quotationId')
  @Roles(Role.DEALER_STAFF, Role.DEALER_MANAGER)
  @ApiOperation({ summary: 'Update quotation' })
  @ApiResponseDocument(
    HttpStatus.OK,
    QuotationResponseDto,
    'Update quotation success',
  )
  async updateQuotation(
    @Param('quotationId', ParseIntPipe) quotationId: number,
    @Body() updateQuotationDto: UpdateQuotationDto,
  ) {
    const updatedQuotation = await this.quotationService.updateQuotation(
      quotationId,
      updateQuotationDto,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Update quotation success',
      data: updatedQuotation,
    };
  }

  @Delete(':quotationId')
  @ApiOperation({ summary: 'Delete quotation' })
  @ApiResponseDocument(HttpStatus.OK, Object, 'Delete quotation success')
  async deleteQuotation(
    @Param('quotationId', ParseIntPipe) quotationId: number,
  ) {
    await this.quotationService.deleteQuotation(quotationId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Delete quotation success',
      data: {},
    };
  }
}
