import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SupabaseFileService } from 'src/supabase/file/supabase.file.service';
import { ColorService } from '../color/color.service';
import { MotorbikeService } from '../electric-motorbike/motorbike.service';
import { CreateCustomerContractDocumentsDto } from './dto';

@Injectable()
export class ImagesService {
  constructor(
    @Inject('COMMON_DIR') private commonDirPath: string,
    @Inject('COLOR_DIR') private colorDirPath: string,
    @Inject('CUSTOMER_CONTRACT_DOCUMENT_DIR')
    private contractDocumentDirPath: string,
    private supabaseFileService: SupabaseFileService,
    private prisma: PrismaService,
    private colorService: ColorService,
    private motorbikeService: MotorbikeService,
  ) {}

  async uploadSingleColorFile(
    file: Express.Multer.File,
    colorId: number,
    motorbikeId: number,
  ) {
    const fileExt = file.originalname;
    const timeStamp = new Date().getTime();
    const [color, motorbike] = await Promise.all([
      this.colorService.getColorById(colorId),
      this.motorbikeService.getMotorbikeDetail(motorbikeId),
    ]);

    const path = `${this.colorDirPath}/${color?.colorType}/${motorbike?.name}/${timeStamp}-${fileExt}`;
    const imageUrl = await this.supabaseFileService.uploadFile(file, path);
    const isImageUrlExist = await this.getColorFile(motorbikeId, colorId);

    if (isImageUrlExist) {
      await this.supabaseFileService.deleteFile(isImageUrlExist.imageUrl);
      await this.prisma.motorbike_Color.update({
        where: {
          motorbikeId_colorId: {
            colorId: colorId,
            motorbikeId: motorbikeId,
          },
        },
        data: {
          imageUrl: imageUrl,
        },
      });
    } else {
      await this.prisma.motorbike_Color.create({
        data: {
          imageUrl: imageUrl,
          colorId: colorId,
          motorbikeId: motorbikeId,
        },
      });
    }
    return imageUrl;
  }

  async uploadCommonFile(
    files: Array<Express.Multer.File>,
    motorbikeId: number,
  ) {
    const motorbike =
      await this.motorbikeService.getMotorbikeDetail(motorbikeId);
    const imageUrlList = await Promise.all(
      files.map((file) => {
        const fileExt = file.originalname;
        const path = `${this.commonDirPath}/${motorbike?.name}/${fileExt}`;
        return this.supabaseFileService.uploadFile(file, path);
      }),
    );
    await Promise.all(
      imageUrlList.map((imageUrl) =>
        this.prisma.motorbike_Image.create({
          data: {
            imageUrl: imageUrl,
            motorbikeId: motorbikeId,
          },
        }),
      ),
    );
    return imageUrlList.map((image) => {
      return {
        imageUrl: image,
      };
    });
  }

  async getColorFile(motorbikeId: number, colorId: number) {
    return await this.prisma.motorbike_Color.findUnique({
      where: {
        motorbikeId_colorId: {
          motorbikeId: motorbikeId,
          colorId: colorId,
        },
      },
    });
  }

  async deleteColorImage(
    motorbikeId: number,
    colorId: number,
    imageUrl: string,
  ) {
    await this.supabaseFileService.deleteFile(imageUrl);
    return await this.prisma.motorbike_Color.delete({
      where: {
        motorbikeId_colorId: {
          colorId: colorId,
          motorbikeId: motorbikeId,
        },
      },
    });
  }

  async deleteMotorbikeImage(imageId: number, imageUrl: string) {
    await this.supabaseFileService.deleteFile(imageUrl);
    return await this.prisma.motorbike_Image.delete({
      where: {
        id: imageId,
      },
    });
  }

  async uploadContractFile(
    files: Array<Express.Multer.File>,
    contractId: number,
    createContractDocument: CreateCustomerContractDocumentsDto,
  ) {
    const contract = await this.prisma.customer_Contract.findUnique({
      where: {
        id: contractId,
      },
    });
    const imageUrlList = await Promise.all(
      files.map((file) => {
        const fileExt = file.originalname;
        const path = `${this.contractDocumentDirPath}/${contract?.id}/${createContractDocument.documentType}/${fileExt}`;
        return this.supabaseFileService.uploadFile(file, path);
      }),
    );
    await Promise.all(
      imageUrlList.map((imageUrl) =>
        this.prisma.contract_Document.create({
          data: {
            documentType: createContractDocument.documentType,
            imageUrl: imageUrl,
            customerContractId: contractId,
          },
        }),
      ),
    );
    return imageUrlList.map((image) => {
      return {
        imageUrl: image,
      };
    });
  }

  async deleteDocumentContract(imageId: number, imageUrl: string) {
    await this.supabaseFileService.deleteFile(imageUrl);
    return await this.prisma.contract_Document.delete({
      where: {
        id: imageId,
      },
    });
  }
}
