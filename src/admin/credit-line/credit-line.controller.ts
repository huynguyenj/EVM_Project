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
import { CreditLineService } from './credit-line.service';
import {
  ApiQueriesAndPagination,
  ApiResponseDocument,
} from 'src/common/decorator';
import {
  CreateCreditLineDto,
  CreditLineDetailResponse,
  CreditLineQueries,
  CreditLineResponseDto,
  UpdateCreditLineDto,
} from './dto';
import { ApiResponseDocumentPagination } from 'src/common/decorator/swagger-decorator/api.response.document.pagination';
import { CreditLineQuery } from './decorators';

@Controller('credit-line')
@ApiTags('Admin & EVM staff - Credit line agency management')
@Roles(Role.ADMIN, Role.EVM_STAFF)
@ApiBearerAuth('access-token')
export class CreditLineController {
  constructor(private creditService: CreditLineService) {}

  @Post()
  @ApiOperation({ summary: 'Create credit line for agency' })
  @ApiResponseDocument(
    HttpStatus.CREATED,
    CreditLineResponseDto,
    'Create credit success',
  )
  async createCreditLine(@Body() createCreditLineDto: CreateCreditLineDto) {
    const createdData =
      await this.creditService.createCreditLine(createCreditLineDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Create credit success',
      data: createdData,
    };
  }

  @Get('list')
  @ApiOperation({ summary: 'Get list credit line' })
  @ApiQueriesAndPagination(
    { name: 'agencyId', example: 1, required: false },
    { name: 'sort', example: 'newest', required: false },
  )
  @ApiResponseDocumentPagination(
    HttpStatus.OK,
    CreditLineResponseDto,
    'Get list credit line success',
  )
  async getListCreditLine(
    @CreditLineQuery() creditLineQueries: CreditLineQueries,
  ) {
    const listData =
      await this.creditService.getAllCreditLine(creditLineQueries);
    return {
      statusCode: HttpStatus.OK,
      message: 'Get list credit line success',
      data: listData.data,
      paginationInfo: listData.paginationInfo,
    };
  }

  @Get('detail/:creditLineId')
  @ApiOperation({ summary: 'Get credit line detail' })
  @ApiResponseDocument(
    HttpStatus.OK,
    CreditLineDetailResponse,
    'Get credit line detail success',
  )
  async getCreditLineDetail(
    @Param('creditLineId', ParseIntPipe) creditLineId: number,
  ) {
    const data = await this.creditService.getCreditLineDetail(creditLineId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Get credit line detail success',
      data: data,
    };
  }

  @Get('agency/:agencyId')
  @ApiOperation({ summary: 'Get credit line agency' })
  @ApiResponseDocument(
    HttpStatus.OK,
    CreditLineDetailResponse,
    'Get credit line detail success',
  )
  @Roles(Role.DEALER_MANAGER)
  async getCreditLineAgency(@Param('agencyId', ParseIntPipe) agencyId: number) {
    const data = await this.creditService.getCreditLineByAgencyId(agencyId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Get credit line agency success',
      data: data,
    };
  }

  @Patch(':creditLineId')
  @ApiOperation({ summary: 'Update credit line' })
  @ApiResponseDocument(
    HttpStatus.OK,
    CreditLineResponseDto,
    'Update credit line success',
  )
  async updateCreditLine(
    @Param('creditLineId', ParseIntPipe) creditLineId: number,
    @Body() updateCreditLineDto: UpdateCreditLineDto,
  ) {
    const updatedData = await this.creditService.updateCreditLine(
      creditLineId,
      updateCreditLineDto,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Update credit line success',
      data: updatedData,
    };
  }

  @Delete(':creditLineId')
  @ApiOperation({ summary: 'Delete credit line' })
  @ApiResponseDocument(HttpStatus.OK, Object, 'Delete credit line success')
  async deleteCreditLine(
    @Param('creditLineId', ParseIntPipe) creditLineId: number,
  ) {
    const updatedData = await this.creditService.deleteCreditLine(creditLineId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Delete credit line success',
      data: updatedData,
    };
  }
}
