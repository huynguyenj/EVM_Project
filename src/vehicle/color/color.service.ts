import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ColorService {
  constructor(private prisma: PrismaService) {}
  async createColor(colorType: string) {
    const colorCreatedData = await this.prisma.color.create({
      data: {
        colorType: colorType,
      },
    });
    return colorCreatedData;
  }

  async getAllColor() {
    const colorList = await this.prisma.color.findMany();
    return colorList;
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
