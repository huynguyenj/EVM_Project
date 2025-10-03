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
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/types/role.enum';
import { ColorService } from './color.service';
import { CreateColorDto, UpdateColorDto } from './dto';

@Controller('color')
@Roles(Role.ADMIN, Role.EVM_STAFF)
export class ColorController {
  constructor(private colorService: ColorService) {}
  @Post()
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
  async getAllColor() {
    const colorList = await this.colorService.getAllColor();
    return {
      message: 'Get color list successfully',
      data: colorList,
    };
  }

  @Patch(':id')
  async updateColor(
    @Param('id', ParseIntPipe) colorId: number,
    @Body() updateColorDto: UpdateColorDto,
  ) {
    const colorUpdated = await this.colorService.updateColor(
      colorId,
      updateColorDto,
    );
    return {
      message: 'Update color success',
      data: colorUpdated,
    };
  }

  @Delete(':id')
  async deleteColor(@Param('id', ParseIntPipe) colorId: number) {
    await this.colorService.deleteColor(colorId);
    return {
      message: 'Delete success!',
    };
  }
}
