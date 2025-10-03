import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { BatteryService } from './battery.service';
import { CreateBatteryDto, UpdateBatteryDto } from './dto';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/types/role.enum';

@Controller('battery')
@Roles(Role.ADMIN, Role.EVM_STAFF)
export class BatteryController {
  constructor(private batteryService: BatteryService) {}

  @Post(':vehicleId')
  async createBattery(
    @Param('vehicleId', ParseIntPipe) vehicleId: number,
    @Body() createBatteryDto: CreateBatteryDto,
  ) {
    const createdBattery = await this.batteryService.createBattery(
      vehicleId,
      createBatteryDto,
    );
    return {
      message: 'Battery created successfully',
      data: createdBattery,
    };
  }

  @Get(':vehicleId')
  async getBatteryByVehicleId(
    @Param('vehicleId', ParseIntPipe) vehicleId: number,
  ) {
    const battery = await this.batteryService.getBatteryByVehicleId(vehicleId);
    return {
      message: 'Battery retrieved successfully',
      data: battery,
    };
  }

  @Patch(':vehicleId')
  async updateBatteryByVehicleId(
    @Param('vehicleId', ParseIntPipe) vehicleId: number,
    @Body() updateBatteryDto: UpdateBatteryDto,
  ) {
    console.log(updateBatteryDto);
    const updatedBattery = await this.batteryService.updateBatteryByVehicleId(
      vehicleId,
      updateBatteryDto,
    );
    return {
      message: 'Battery updated successfully',
      data: updatedBattery,
    };
  }

  @Delete(':vehicleId')
  async deleteSafeFeatureByVehicleId(
    @Param('vehicleId', ParseIntPipe) vehicleId: number,
  ) {
    await this.batteryService.deleteBatteryByVehicleId(vehicleId);
    return {
      message: 'Safe feature deleted successfully',
    };
  }
}
