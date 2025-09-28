import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class StaffService {
  constructor(private prisma: PrismaService) {}

  async createStaff(staffInput) {
    console.log(staffInput);
    return staffInput;
  }
}
