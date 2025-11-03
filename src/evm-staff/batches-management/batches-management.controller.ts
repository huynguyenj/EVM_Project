import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/types/role.enum';
import { BatchesManagementService } from './batches-management.service';
import {
  ApiQueriesAndPagination,
  ApiResponseDocument,
} from 'src/common/decorator';
import {
  ApBatchesResponseDto,
  BatchesDetailResponse,
  BatchesQueries,
  CreateBatchesDto,
  UpdateBatchesDto,
} from './dto';
import { BatchesStatus } from './types';
import { ApiResponseDocumentPagination } from 'src/common/decorator/swagger-decorator/api.response.document.pagination';
import { BatchesQuery } from './decorators';

@Controller('batches-management')
@ApiTags('Dealer staff & Admin - Ap Batches Management')
@ApiBearerAuth('access-token')
@Roles(Role.DEALER_STAFF, Role.ADMIN)
export class BatchesManagementController {
  constructor(private batchesService: BatchesManagementService) {}

  @Post()
  @ApiOperation({ summary: 'Create batch' })
  @ApiResponseDocument(
    HttpStatus.CREATED,
    ApBatchesResponseDto,
    'Create batch success',
  )
  async createBatch(@Body() createBatchesDto: CreateBatchesDto) {
    const createdData =
      await this.batchesService.createApBatches(createBatchesDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Create batch success',
      data: createdData,
    };
  }

  @Get('list')
  @ApiOperation({ summary: 'Get list batches' })
  @ApiQueriesAndPagination({
    name: 'status',
    example: BatchesStatus,
    required: false,
  })
  @ApiResponseDocumentPagination(
    HttpStatus.OK,
    ApBatchesResponseDto,
    'Get list batches success',
  )
  async getListBatches(@BatchesQuery() batchesQueries: BatchesQueries) {
    const listData = await this.batchesService.getAllBatches(batchesQueries);
    return {
      statusCode: HttpStatus.OK,
      message: 'Get list batches success',
      data: listData.data,
      paginationInfo: listData.paginationInfo,
    };
  }

  @Get('list/agency/:agencyId')
  @Roles(Role.DEALER_MANAGER)
  @ApiOperation({ summary: 'Get list batches for agency' })
  @ApiQueriesAndPagination({
    name: 'status',
    example: BatchesStatus,
    required: false,
  })
  @ApiResponseDocumentPagination(
    HttpStatus.OK,
    ApBatchesResponseDto,
    'Get list batches success',
  )
  async getListBatchesForAgency(
    @Param('agencyId') agencyId: number,
    @BatchesQuery() batchesQueries: BatchesQueries,
  ) {
    const listData = await this.batchesService.getAllBatchesOfAgency(
      agencyId,
      batchesQueries,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Get list batches success',
      data: listData.data,
      paginationInfo: listData.paginationInfo,
    };
  }

  @Get('detail/:batchId')
  @ApiOperation({ summary: 'Get batch detail' })
  @Roles(Role.ADMIN, Role.EVM_STAFF, Role.DEALER_MANAGER)
  @ApiResponseDocument(
    HttpStatus.OK,
    BatchesDetailResponse,
    'Get batch detail success',
  )
  async getBatchDetail(@Param('batchId') batchId: number) {
    const data = await this.batchesService.getBatchDetail(batchId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Get batch detail success',
      data: data,
    };
  }

  @Patch(':batchId')
  @ApiOperation({ summary: 'Update batch' })
  @ApiResponseDocument(
    HttpStatus.OK,
    ApBatchesResponseDto,
    'Update batch success',
  )
  async updateBatch(
    @Param('batchId') batchId: number,
    @Body() updateBatchDto: UpdateBatchesDto,
  ) {
    const data = await this.batchesService.updateBatches(
      batchId,
      updateBatchDto,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Update batch success',
      data: data,
    };
  }

  @Delete(':batchId')
  @ApiOperation({ summary: 'Delete batch' })
  @Roles(Role.ADMIN, Role.EVM_STAFF, Role.DEALER_MANAGER)
  @ApiResponseDocument(
    HttpStatus.OK,
    BatchesDetailResponse,
    'Delete batch success',
  )
  async deleteBatch(@Param('batchId') batchId: number) {
    const data = await this.batchesService.deleteBatches(batchId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Delete success',
      data: data,
    };
  }
}
