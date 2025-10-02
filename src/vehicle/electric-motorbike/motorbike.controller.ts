import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  SetMetadata,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/types/role.enum';
import { MotorbikeService } from './motorbike.service';
import { CreateMotorbikeDto } from './dto';
import { Prisma } from 'generated/prisma';
import { type MotorbikeRequestParam } from './types/motorbike.param';
import { Motorbike } from './decorators/motorbike.decorator';

@Controller('motorbike')
export class MotorbikeController {
  constructor(private motorbikeService: MotorbikeService) {}
  @Post()
  @Roles(Role.ADMIN, Role.EVM_STAFF)
  async createMotorbike(@Body() createMotorbikeDto: CreateMotorbikeDto) {
    const createdData =
      await this.motorbikeService.createMotorbike(createMotorbikeDto);
    return {
      message: 'Created successfully!',
      data: createdData,
    };
  }

  @Get()
  @SetMetadata('public', true)
  async getAllMotorbike(@Motorbike() pagination: MotorbikeRequestParam) {
    const motorbikeList = await this.motorbikeService.getAllMotorbike(
      pagination.page,
      pagination.limit,
    );
    return {
      message: 'Get list motorbikes successfully!',
      data: motorbikeList,
    };
  }

  @Get('admin')
  @SetMetadata('public', true)
  async getAllMotorbikeForAdmin(
    @Motorbike() motorbikeParams: MotorbikeRequestParam,
  ) {
    const motorbikeList =
      await this.motorbikeService.getMotorbikeAdmin(motorbikeParams);
    return {
      message: 'Get list motorbikes successfully',
      data: motorbikeList,
    };
  }
  @Get('filters')
  @SetMetadata('public', true)
  async getFilter() {
    const filterData = await this.motorbikeService.getFilter();
    return {
      message: 'Get filter successfully',
      filterData: filterData,
    };
  }

  @Get(':id')
  @SetMetadata('public', true)
  async getMotorbikeDetail(@Param('id', ParseIntPipe) id: number) {
    const motorbike = await this.motorbikeService.getMotorbikeDetail(id);
    return {
      message: 'Get motorbike successfully!',
      data: motorbike,
    };
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.EVM_STAFF)
  async updateMotorbike(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMotorbikeDto: Prisma.Electric_MotorbikeUpdateInput,
  ) {
    const updatedData = await this.motorbikeService.updateMotorbike(
      id,
      updateMotorbikeDto,
    );
    return {
      message: 'Update successfully!',
      data: updatedData,
    };
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.EVM_STAFF)
  async deleteMotorbike(@Param('id', ParseIntPipe) id: number) {
    await this.motorbikeService.deleteMotorbike(id);
    return {
      message: 'Delete successfully!',
    };
  }
}
