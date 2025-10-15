import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AgencyQueries, CreateAgencyDto, UpdateAgencyDto } from './dto';

@Injectable()
export class AgencyService {
  constructor(private prisma: PrismaService) {}

  async createAgency(agencyData: CreateAgencyDto) {
    console.log(agencyData);
    const createdData = await this.prisma.agency.create({
      data: {
        name: agencyData.name,
        address: agencyData.address,
        contactInfo: agencyData.contactInfo,
        location: agencyData.location,
      },
    });
    return createdData;
  }

  async getListAgency(agencyQueries: AgencyQueries) {
    const skipData = (agencyQueries.page - 1) * agencyQueries.limit;
    const filters: any[] = [];
    if (agencyQueries.location) {
      filters.push({
        location: {
          contains: agencyQueries.location,
          mode: 'insensitive',
        },
      });
    }
    if (agencyQueries.address) {
      filters.push({
        address: {
          contains: agencyQueries.address,
          mode: 'insensitive',
        },
      });
    }
    const dataList = await this.prisma.agency.findMany({
      skip: skipData,
      take: agencyQueries.limit,
      where: filters.length > 0 ? { AND: filters } : {},
    });
    return {
      dataList,
      paginationInfo: {
        page: agencyQueries.page,
        limit: agencyQueries.limit,
        total: await this.getTotalAgency(),
      },
    };
  }

  async getAgencyDetail(agencyId: number) {
    const data = await this.prisma.agency.findUnique({
      where: {
        id: agencyId,
      },
    });
    if (!data) throw new NotFoundException('Can not found the agency!');
    return data;
  }

  async getTotalAgency() {
    return await this.prisma.agency.count();
  }

  async updateAgency(agencyId: number, agencyUpdateDto: UpdateAgencyDto) {
    const updatedData = await this.prisma.agency.update({
      where: {
        id: agencyId,
      },
      data: agencyUpdateDto,
    });
    return updatedData;
  }

  async deleteAgency(agencyId: number) {
    await this.prisma.agency.delete({
      where: {
        id: agencyId,
      },
    });
    return;
  }
}
