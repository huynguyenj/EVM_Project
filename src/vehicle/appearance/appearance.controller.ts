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
import { AppearanceService } from './appearance.service';
import { CreateAppearanceDto, UpdateAppearanceDto } from './dto';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/types/role.enum';

@Controller('appearance')
@Roles(Role.ADMIN, Role.EVM_STAFF)
export class AppearanceController {
  constructor(private appearanceService: AppearanceService) {}
  @Post(':vehicleId')
  async createAppearance(
    @Param('vehicleId', ParseIntPipe) vehicleId: number,
    @Body() createAppearanceDto: CreateAppearanceDto,
  ) {
    const createdAppearance = await this.appearanceService.createAppearance(
      vehicleId,
      createAppearanceDto,
    );
    return {
      message: 'Appearance created successfully',
      data: createdAppearance,
    };
  }

  @Get(':vehicleId')
  async getAppearanceByVehicleId(
    @Param('vehicleId', ParseIntPipe) vehicleId: number,
  ) {
    const appearance =
      await this.appearanceService.getAppearanceByVehicleId(vehicleId);
    return {
      message: 'Appearance retrieved successfully',
      data: appearance,
    };
  }

  @Patch(':vehicleId')
  async updateAppearanceByVehicleId(
    @Param('vehicleId', ParseIntPipe) vehicleId: number,
    @Body() updateAppearanceDto: UpdateAppearanceDto,
  ) {
    const updatedAppearance =
      await this.appearanceService.updateAppearanceByVehicleId(
        vehicleId,
        updateAppearanceDto,
      );
    return {
      message: 'Appearance updated successfully',
      data: updatedAppearance,
    };
  }

  @Delete(':vehicleId')
  async deleteAppearanceByVehicleId(
    @Param('vehicleId', ParseIntPipe) vehicleId: number,
  ) {
    await this.appearanceService.deleteAppearanceByVehicleId(vehicleId);
    return {
      message: 'Appearance deleted successfully',
    };
  }
}
