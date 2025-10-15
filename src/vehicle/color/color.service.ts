import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ColorService {
  constructor(private prisma: PrismaService) {}
  async createColor(colorType: string) {
    const isColorExisted = await this.prisma.color.findUnique({
      where: {
        colorType: colorType,
      },
    });
    if (isColorExisted)
      throw new BadRequestException('This color already created!');
    const colorCreatedData = await this.prisma.color.create({
      data: {
        colorType: colorType.toLowerCase(),
      },
    });
    return colorCreatedData;
  }

  async getAllColor() {
    const colorList = await this.prisma.color.findMany();
    return colorList;
  }

  async getColorById(colorId: number) {
    const color = await this.prisma.color.findUnique({
      where: {
        id: colorId,
      },
    });
    if (!color) throw new NotFoundException('Not found the color!');
    return color;
  }

  async updateColor(colorId: number, updateColorDto: Prisma.ColorUpdateInput) {
    const updatedData = await this.prisma.color.update({
      where: {
        id: colorId,
      },
      data: {
        colorType: updateColorDto.colorType,
      },
    });
    return updatedData;
  }

  async deleteColor(colorId: number) {
    await this.prisma.color.delete({
      where: {
        id: colorId,
      },
    });
    return;
  }
}
