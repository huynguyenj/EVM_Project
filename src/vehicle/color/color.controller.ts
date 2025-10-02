import { Body, Controller, Get, Post } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/types/role.enum';
import { CreateColorDto } from './dto/create-color-dto';
import { ColorService } from './color.service';

@Controller('color')
export class ColorController {
  constructor(private colorService: ColorService) {}
  @Post()
  @Roles(Role.ADMIN, Role.EVM_STAFF)
  async createColor(@Body() createColorDto: CreateColorDto) {
    const createdData = await this.colorService.createColor(
      createColorDto.colorType,
    );
    return {
      message: 'Create color success',
      data: createdData,
    };
  }

  @Get()
  @Roles(Role.ADMIN, Role.EVM_STAFF)
  async getAllColor() {
    const colorList = await this.colorService.getAllColor();
    return {
      message: 'Get color list successfully',
      data: colorList,
    };
  }
}
