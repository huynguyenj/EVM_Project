import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  AgencyStockQueries,
  CreateAgencyStockDto,
  UpdateAgencyStockDto,
} from './dto';
import { MotorbikeService } from 'src/vehicle/electric-motorbike/motorbike.service';
import { Prisma } from 'generated/prisma';

@Injectable()
export class AgencyStockService {
  constructor(
    private prisma: PrismaService,
    private motorbikeService: MotorbikeService,
  ) {}

  async createAgencyStock(createAgencyStockDto: CreateAgencyStockDto) {
    const motorbikeColor = await this.motorbikeService.getMotorbikeColor(
      createAgencyStockDto.motorbikeId,
      createAgencyStockDto.colorId,
    );
    const isMotorbikeStockExited = await this.prisma.agency_Stock.findUnique({
      where: {
        motorbikeId_colorId_agencyId: {
          colorId: motorbikeColor.colorId,
          motorbikeId: createAgencyStockDto.motorbikeId,
          agencyId: createAgencyStockDto.agencyId,
        },
      },
    });
    if (isMotorbikeStockExited)
      throw new BadRequestException(
        'This motorbike with this color already available in stock of the agency.',
      );
    const createdData = await this.prisma.agency_Stock.create({
      data: createAgencyStockDto,
    });
    return createdData;
  }

  async getListAgencyStock(
    agencyId: number,
    agencyStockQueries: AgencyStockQueries,
  ) {
    const skipData = (agencyStockQueries.page - 1) * agencyStockQueries.limit;
    const filters: object[] = [];
    if (agencyStockQueries.motorbikeId) {
      filters.push({ motorbikeId: Number(agencyStockQueries.motorbikeId) });
    }
    if (agencyStockQueries.colorId) {
      filters.push({ colorId: Number(agencyStockQueries.colorId) });
    }
    const listData = await this.prisma.agency_Stock.findMany({
      skip: skipData,
      take: agencyStockQueries.limit,
      include: {
        motorbike: {
          select: {
            name: true,
          },
        },
        color: {
          select: {
            colorType: true,
          },
        },
      },
      where: {
        AND: [{ agencyId: agencyId }, ...filters],
      },
      orderBy: {
        id: agencyStockQueries.sort === 'newest' ? 'desc' : 'asc',
      },
    });
    const totalAgencyStock = await this.prisma.agency_Stock.count({
      where: {
        AND: [{ agencyId: agencyId }, ...filters],
      },
    });
    return {
      data: listData,
      paginationInfo: {
        page: agencyStockQueries.page,
        limit: agencyStockQueries.limit,
        total: totalAgencyStock,
        totalPages: Math.ceil(totalAgencyStock / agencyStockQueries.limit),
      },
    };
  }

  async getListAgencyStockMoreInfo(
    agencyId: number,
    agencyStockQueries: AgencyStockQueries,
  ) {
    const skipData = (agencyStockQueries.page - 1) * agencyStockQueries.limit;
    const listData = await this.prisma.$queryRaw`
      select agst.id, agst.price, agst.quantity, agst."createAt", agst."updateAt", agst."agencyId", agst."motorbikeId", agst."colorId", em.name, em.description, em.model, em."makeFrom", em.version, mc."imageUrl", cl."colorType"
      from electric_motorbikes em 
      join (
        select id, price, quantity, "createAt", "updateAt", "agencyId", "motorbikeId", "colorId" 
        from agency_stocks
        where "agencyId" = ${agencyId}
               ${agencyStockQueries.motorbikeId ? Prisma.sql`and "motorbikeId" = ${agencyStockQueries.motorbikeId}::integer` : Prisma.empty}
               ${agencyStockQueries.colorId ? Prisma.sql`and "colorId" = ${agencyStockQueries.colorId}::integer` : Prisma.empty}
               and quantity > 0
      ) as agst
      on em.id = agst."motorbikeId"
      join motorbike_color mc
      on agst."motorbikeId" = mc."motorbikeId" and agst."colorId" = mc."colorId"
      join colors cl on agst."colorId" = cl.id
      order by agst.id ${agencyStockQueries.sort === 'newest' ? Prisma.sql`desc` : Prisma.sql`asc`}
      offset ${skipData}
      limit ${agencyStockQueries.limit}
    `;
    const totalAgencyStock = await this.getTotalAgencyStock(agencyId);
    return {
      data: listData,
      paginationInfo: {
        page: agencyStockQueries.page,
        limit: agencyStockQueries.limit,
        total: totalAgencyStock,
        totalPages: Math.ceil(totalAgencyStock / agencyStockQueries.limit),
      },
    };
  }

  async getListAgencyOutOfStockMoreInfo(
    agencyId: number,
    agencyStockQueries: AgencyStockQueries,
  ) {
    const skipData = (agencyStockQueries.page - 1) * agencyStockQueries.limit;
    const listData = await this.prisma.$queryRaw`
      select agst.id, agst.price, agst.quantity, agst."createAt", agst."updateAt", agst."agencyId", agst."motorbikeId", agst."colorId", em.name, em.description, em.model, em."makeFrom", em.version, mc."imageUrl", cl."colorType"
      from electric_motorbikes em 
      join (
        select id, price, quantity, "createAt", "updateAt", "agencyId", "motorbikeId", "colorId" 
        from agency_stocks
        where "agencyId" = ${agencyId}
               ${agencyStockQueries.motorbikeId ? Prisma.sql`and "motorbikeId" = ${agencyStockQueries.motorbikeId}::integer` : Prisma.empty}
               ${agencyStockQueries.colorId ? Prisma.sql`and "colorId" = ${agencyStockQueries.colorId}::integer` : Prisma.empty}
               and quantity = 0
      ) as agst
      on em.id = agst."motorbikeId"
      join motorbike_color mc
      on agst."motorbikeId" = mc."motorbikeId" and agst."colorId" = mc."colorId"
      join colors cl on agst."colorId" = cl.id
      order by agst.id ${agencyStockQueries.sort === 'newest' ? Prisma.sql`desc` : Prisma.sql`asc`}
      offset ${skipData}
      limit ${agencyStockQueries.limit}
    `;
    const totalAgencyStock = await this.getTotalAgencyStock(agencyId);
    return {
      data: listData,
      paginationInfo: {
        page: agencyStockQueries.page,
        limit: agencyStockQueries.limit,
        total: totalAgencyStock,
        totalPages: Math.ceil(totalAgencyStock / agencyStockQueries.limit),
      },
    };
  }

  async getListMotorbikeNotInStock(
    agencyId: number,
    agencyStockQueries: AgencyStockQueries,
  ) {
    const skipData = (agencyStockQueries.page - 1) * agencyStockQueries.limit;
    const listData = await this.prisma.$queryRaw`
       select em.*, mc."imageUrl", mc."colorId", clrs."colorType"
       from electric_motorbikes em
       join (
        SELECT *
        FROM motorbike_color mc
        WHERE NOT EXISTS (
          SELECT 1
          FROM agency_stocks agst
          WHERE agst."motorbikeId" = mc."motorbikeId" and agst."colorId" = mc."colorId"
          AND agst."agencyId" = ${agencyId}
        ) 
      ) as mc
      on em.id = mc."motorbikeId"
      join colors clrs on clrs.id = mc."colorId"
      where em."isDeleted" = false
      ${agencyStockQueries.makeFrom ? Prisma.sql`and em."makeFrom" = ${agencyStockQueries.makeFrom}` : Prisma.empty}
      ${agencyStockQueries.version ? Prisma.sql`and em.version = ${agencyStockQueries.version}` : Prisma.empty}
      ${agencyStockQueries.model ? Prisma.sql`and em.model = ${agencyStockQueries.model}` : Prisma.empty}
      ORDER BY em.id ${agencyStockQueries.sort === 'newest' ? Prisma.sql`desc` : Prisma.sql`asc`}
      OFFSET ${skipData}
      LIMIT ${agencyStockQueries.limit}
    `;
    const totalAgencyStock = await this.getTotalMotorbikeNotInStock(agencyId);
    return {
      data: listData,
      paginationInfo: {
        page: agencyStockQueries.page,
        limit: agencyStockQueries.limit,
        total: totalAgencyStock,
        totalPages: Math.ceil(totalAgencyStock / agencyStockQueries.limit),
      },
    };
  }

  async getTotalMotorbikeNotInStock(agencyId: number) {
    const data = await this.prisma.$queryRaw<{ total: number }[]>`
        SELECT count (ems.id) as total
        FROM (
          SELECT distinct on (em.id) em.id::integer
          FROM electric_motorbikes em
          join motorbike_images mi 
          on mi."motorbikeId" = em.id 
          WHERE NOT EXISTS (
          SELECT 1
          FROM agency_stocks agst
          WHERE agst."motorbikeId" = em.id
          AND agst."agencyId" = ${agencyId}
      )
        and em."isDeleted" = false
  ) as ems`;
    return Number(data[0].total);
  }

  async getDetailMotorbikeNotInStock(motorbikeId: number, colorId: number) {
    const data = await this.prisma.motorbike_Color.findUnique({
      where: {
        motorbikeId_colorId: {
          motorbikeId: motorbikeId,
          colorId: colorId,
        },
      },
      select: {
        motorbike: {
          include: {
            appearance: true,
            battery: true,
            safeFeature: true,
            configuration: true,
            images: true,
          },
        },
        color: {
          select: {
            colorType: true,
          },
        },
        imageUrl: true,
      },
    });
    if (!data) throw new NotFoundException('Not found motorbike detail');
    return data;
  }

  async getTotalAgencyStock(agencyId: number) {
    return await this.prisma.agency_Stock.count({
      where: {
        agencyId: agencyId,
      },
    });
  }

  async getAgencyStockDetail(agencyStockId: number) {
    const data = await this.prisma.agency_Stock.findUnique({
      where: {
        id: agencyStockId,
      },
      include: {
        agencyStockPromotion: {
          include: {
            stockPromotion: true,
          },
        },
        color: true,
        motorbike: {
          select: {
            id: true,
            name: true,
            price: true,
            version: true,
            model: true,
            makeFrom: true,
            images: {
              select: {
                id: true,
                imageUrl: true,
              },
            },
          },
        },
      },
    });
    if (!data) throw new NotFoundException('Not found this stock!');
    const colorImageUrl = await this.prisma.motorbike_Color.findUnique({
      where: {
        motorbikeId_colorId: {
          colorId: data.colorId,
          motorbikeId: data.motorbikeId,
        },
      },
    });
    const finalDataResponse = {
      ...data,
      imageColor: colorImageUrl?.imageUrl,
    };
    return finalDataResponse;
  }

  async updateAgencyStock(
    agencyStockId: number,
    updateAgencyStockDto: UpdateAgencyStockDto,
  ) {
    const updatedData = await this.prisma.agency_Stock.update({
      where: {
        id: agencyStockId,
      },
      data: {
        ...updateAgencyStockDto,
        updateAt: new Date(),
      },
    });
    return updatedData;
  }

  async deleteAgencyStock(agencyStockId: number) {
    await this.prisma.agency_Stock_Promotion.deleteMany({
      where: {
        agencyStockId: agencyStockId,
      },
    });
    await this.prisma.agency_Stock.delete({
      where: {
        id: agencyStockId,
      },
    });
    return;
  }

  async updateAgencyStockQuantity(
    motorbikeId: number,
    agencyId: number,
    colorId: number,
    minusQuantity: number,
  ) {
    const isStockHas = await this.prisma.agency_Stock.findUnique({
      where: {
        motorbikeId_colorId_agencyId: {
          agencyId: agencyId,
          colorId: colorId,
          motorbikeId: motorbikeId,
        },
      },
    });
    if (!isStockHas) return;
    await this.prisma.agency_Stock.update({
      where: {
        motorbikeId_colorId_agencyId: {
          agencyId: agencyId,
          colorId: colorId,
          motorbikeId: motorbikeId,
        },
      },
      data: {
        quantity: isStockHas.quantity - minusQuantity,
      },
    });
  }
}
