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
import { BatteryService } from './battery.service';
import { BatteryResponseDto, CreateBatteryDto, UpdateBatteryDto } from './dto';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/types/role.enum';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ApiResponseDocument } from 'src/common/decorator';

@ApiBearerAuth('access-token')
@Controller('battery')
@Roles(Role.ADMIN, Role.EVM_STAFF)
export class BatteryController {
  constructor(private batteryService: BatteryService) {}

  @Post(':vehicleId')
  @ApiOperation({ summary: 'Create battery for motorbike!' })
  @ApiResponseDocument(
    HttpStatus.CREATED,
    BatteryResponseDto,
    'Create battery successfully!',
  )
  async createBattery(
    @Param('vehicleId', ParseIntPipe) vehicleId: number,
    @Body() createBatteryDto: CreateBatteryDto,
  ) {
    const createdBattery = await this.batteryService.createBattery(
      vehicleId,
      createBatteryDto,
    );
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Battery created successfully',
      data: createdBattery,
    };
  }

  @Get(':vehicleId')
  @ApiOperation({ summary: 'Get battery detail' })
  @ApiResponseDocument(
    HttpStatus.OK,
    BatteryResponseDto,
    'Get battery successfully!',
  )
  async getBatteryByVehicleId(
    @Param('vehicleId', ParseIntPipe) vehicleId: number,
  ) {
    const battery = await this.batteryService.getBatteryByVehicleId(vehicleId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Battery retrieved successfully',
      data: battery,
    };
  }

  @Patch(':vehicleId')
  @ApiOperation({ summary: 'Update battery for motorbike' })
  @ApiResponseDocument(
    HttpStatus.OK,
    BatteryResponseDto,
    'Update battery successfully!',
  )
  async updateBatteryByVehicleId(
    @Param('vehicleId', ParseIntPipe) vehicleId: number,
    @Body() updateBatteryDto: UpdateBatteryDto,
  ) {
    const updatedBattery = await this.batteryService.updateBatteryByVehicleId(
      vehicleId,
      updateBatteryDto,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Battery updated successfully',
      data: updatedBattery,
    };
  }

  @Delete(':vehicleId')
  @ApiOperation({ summary: 'Delete battery' })
  @ApiResponseDocument(HttpStatus.OK, Object, 'Create battery successfully!')
  async deleteSafeFeatureByVehicleId(
    @Param('vehicleId', ParseIntPipe) vehicleId: number,
  ) {
    await this.batteryService.deleteBatteryByVehicleId(vehicleId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Safe feature deleted successfully',
      data: {},
    };
  }
}
