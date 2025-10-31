import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
// import { CreateRevenueDto } from './dto';

@Injectable()
export class RevenueService {
  constructor(private prisma: PrismaService) {}

  // async createRevenue(createRevenueDto: CreateRevenueDto) {
  //   const currentData = new Date();
  // }
}
