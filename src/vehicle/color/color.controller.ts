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
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/types/role.enum';
import { ColorService } from './color.service';
import { ColorResponseDto, CreateColorDto, UpdateColorDto } from './dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import {
  ApiResponseDocument,
  ApiResponseDocumentArray,
} from 'src/common/decorator';

@ApiBearerAuth('access-token')
@Controller('color')
@Roles(Role.ADMIN, Role.EVM_STAFF)
export class ColorController {
  constructor(private colorService: ColorService) {}
  @Post()
  @ApiOperation({ summary: 'Create color' })
  @ApiResponseDocument(
    HttpStatus.CREATED,
    ColorResponseDto,
    'Create color success!',
  )
  async createColor(@Body() createColorDto: CreateColorDto) {
    const createdData = await this.colorService.createColor(
      createColorDto.colorType,
    );
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Create color success',
      data: createdData,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get color' })
  @ApiResponseDocumentArray(
    HttpStatus.OK,
    ColorResponseDto,
    'Get color success!',
  )
  async getAllColor() {
    const colorList = await this.colorService.getAllColor();
    return {
      statusCode: HttpStatus.OK,
      message: 'Get color list successfully',
      data: colorList,
    };
  }

  @Patch(':colorId')
  @ApiOperation({ summary: 'Update color' })
  @ApiResponseDocument(HttpStatus.OK, ColorResponseDto, 'Update color success!')
  async updateColor(
    @Param('colorId', ParseIntPipe) colorId: number,
    @Body() updateColorDto: UpdateColorDto,
  ) {
    const colorUpdated = await this.colorService.updateColor(
      colorId,
      updateColorDto,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Update color success',
      data: colorUpdated,
    };
  }

  @Delete(':colorId')
  @ApiOperation({ summary: 'Delete color' })
  @ApiResponseDocument(HttpStatus.OK, Object, 'Delete color success')
  async deleteColor(@Param('colorId', ParseIntPipe) colorId: number) {
    await this.colorService.deleteColor(colorId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Delete success!',
      data: {},
    };
  }
}
