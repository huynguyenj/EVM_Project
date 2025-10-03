import { Injectable } from '@nestjs/common';
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
}
