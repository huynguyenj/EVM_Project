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
  SetMetadata,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/types/role.enum';
import { MotorbikeService } from './motorbike.service';
import {
  CreateMotorbikeDto,
  FilterResponseDto,
  MotorbikeDetailResponseDto,
  MotorbikeResponseDto,
  UpdateMotorbikeDto,
  UpdateMotorbikeResponseDto,
} from './dto';
import { Motorbike } from './decorators/motorbike.decorator';
import { type MotorbikeRequestQuery } from './types/motorbike.param';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import {
  ApiQueriesAndPagination,
  ApiResponseDocument,
} from 'src/common/decorator';
import { ApiResponseDocumentPagination } from 'src/common/decorator/swagger-decorator/api.response.document.pagination';
@ApiBearerAuth('access-token')
@Controller('motorbike')
export class MotorbikeController {
  constructor(private motorbikeService: MotorbikeService) {}
  @Post()
  @Roles(Role.ADMIN, Role.EVM_STAFF)
  @ApiOperation({ summary: 'Create motorbike' })
  @ApiResponseDocument(
    HttpStatus.CREATED,
    MotorbikeResponseDto,
    'Create motorbike successfully!',
  )
  async createMotorbike(@Body() createMotorbikeDto: CreateMotorbikeDto) {
    const createdData =
      await this.motorbikeService.createMotorbike(createMotorbikeDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Created successfully!',
      data: createdData,
    };
  }

  @Get()
  @SetMetadata('public', true)
  @ApiOperation({ summary: 'Get list motorbikes' })
  @ApiQueriesAndPagination(
    { name: 'model', type: String, required: false, example: 'Model X' },
    { name: 'makeFrom', type: String, required: false, example: 'Viet Nam' },
    { name: 'sort', example: 'newest', required: false },
  )
  @ApiResponseDocumentPagination(
    HttpStatus.OK,
    MotorbikeResponseDto,
    'Get list motorbike successfully!',
  )
  async getAllMotorbike(@Motorbike() motorbikeParams: MotorbikeRequestQuery) {
    const data = await this.motorbikeService.getAllMotorbike(motorbikeParams);
    return {
      statusCode: HttpStatus.OK,
      message: 'Get list motorbikes successfully!',
      data: data.motorbikeList,
      paginationInfo: data.paginationInfo,
    };
  }

  @Get('admin')
  @ApiOperation({ summary: 'Get list motorbikes for admin' })
  @ApiQueriesAndPagination(
    { name: 'model', type: String, required: false, example: 'Model X' },
    { name: 'makeFrom', type: String, required: false, example: 'Viet Nam' },
    { name: 'sort', example: 'newest', required: false },
  )
  @ApiResponseDocumentPagination(
    HttpStatus.OK,
    MotorbikeResponseDto,
    'Get list motorbike successfully!',
  )
  async getAllMotorbikeForAdmin(
    @Motorbike() motorbikeParams: MotorbikeRequestQuery,
  ) {
    const data = await this.motorbikeService.getMotorbikeAdmin(motorbikeParams);
    return {
      statusCode: HttpStatus.OK,
      message: 'Get list motorbikes successfully!',
      data: data.motorbikeList,
      paginationInfo: data.paginationInfo,
    };
  }

  @Get('filters')
  @SetMetadata('public', true)
  @ApiOperation({ summary: 'Get motorbike filters' })
  @ApiResponseDocument(
    HttpStatus.OK,
    FilterResponseDto,
    'Get motorbike filter successfully!',
  )
  async getFilter() {
    const filterData = await this.motorbikeService.getFilter();
    return {
      statusCode: HttpStatus.OK,
      message: 'Get filter successfully',
      data: filterData,
    };
  }

  @Get(':id')
  @SetMetadata('public', true)
  @ApiOperation({ summary: 'Get motorbike detail' })
  @ApiResponseDocument(
    HttpStatus.OK,
    MotorbikeDetailResponseDto,
    'Get motorbike detail successfully!',
  )
  @SetMetadata('public', true)
  async getMotorbikeDetail(@Param('id', ParseIntPipe) id: number) {
    const motorbike = await this.motorbikeService.getMotorbikeDetail(id);
    return {
      message: 'Get motorbike successfully!',
      data: motorbike,
    };
  }

  @Patch(':motorbikeId')
  @Roles(Role.ADMIN, Role.EVM_STAFF)
  @ApiOperation({ summary: 'Update motorbike information' })
  @ApiResponseDocument(
    HttpStatus.OK,
    UpdateMotorbikeResponseDto,
    'Update successfully!',
  )
  async updateMotorbike(
    @Param('motorbikeId', ParseIntPipe) motorbikeId: number,
    @Body() updateMotorbikeDto: UpdateMotorbikeDto,
  ) {
    const updatedData = await this.motorbikeService.updateMotorbike(
      motorbikeId,
      updateMotorbikeDto,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Update successfully!',
      data: updatedData,
    };
  }

  @Delete(':motorbikeId')
  @ApiOperation({ summary: 'Delete successfully!' })
  @ApiResponseDocument(HttpStatus.OK, Object, 'Delete successfully!')
  @Roles(Role.ADMIN, Role.EVM_STAFF)
  async deleteMotorbike(
    @Param('motorbikeId', ParseIntPipe) motorbikeId: number,
  ) {
    await this.motorbikeService.deleteMotorbike(motorbikeId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Delete successfully!',
      data: {},
    };
  }
}
