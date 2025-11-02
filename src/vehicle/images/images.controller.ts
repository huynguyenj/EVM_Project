import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { DeleteImageDto } from './dto/request/delete-image-dto';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/auth/types/role.enum';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import {
  CreateCustomerContractDocumentsDto,
  ImageResponse,
  MotorbikeColorFileDto,
  MotorbikeImages,
} from './dto';
import {
  ApiFileUpload,
  ApiResponseDocument,
  ApiResponseDocumentArray,
} from 'src/common/decorator';

@ApiBearerAuth('access-token')
@Controller('images')
@Roles(Role.ADMIN)
export class ImagesController {
  constructor(private imageServices: ImagesService) {}

  @Post('motorbike-color/:motorbikeId/:colorId')
  @UseInterceptors(FileInterceptor('color_image'))
  @ApiOperation({ summary: 'Upload file image motorbike color' })
  @ApiFileUpload(MotorbikeColorFileDto)
  @ApiResponseDocument(
    HttpStatus.CREATED,
    ImageResponse,
    'Upload image success!',
  )
  async uploadColorMotorbikeFile(
    @Param('motorbikeId', ParseIntPipe) motorbikeId: number,
    @Param('colorId', ParseIntPipe) colorId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const imageUrl = await this.imageServices.uploadSingleColorFile(
      file,
      colorId,
      motorbikeId,
    );
    return {
      statusCode: HttpStatus.CREATED,
      data: imageUrl,
      message: 'Upload image success!',
    };
  }

  @Post('motorbike/:motorbikeId')
  @ApiOperation({ summary: 'Upload multiple files images motorbike' })
  @ApiResponseDocumentArray(
    HttpStatus.CREATED,
    ImageResponse,
    'Upload files success!',
  )
  @ApiFileUpload(MotorbikeImages)
  @UseInterceptors(FilesInterceptor('images'))
  async uploadMotorbikeImages(
    @Param('motorbikeId', ParseIntPipe) motorbikeId: number,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const imageUrlLists = await this.imageServices.uploadCommonFile(
      files,
      motorbikeId,
    );
    return {
      statusCode: HttpStatus.CREATED,
      data: imageUrlLists,
      message: 'Upload files success',
    };
  }

  @Delete('color/:motorbikeId/:colorId')
  @ApiOperation({ summary: 'Delete images color motorbike' })
  async deleteColorImage(
    @Param('motorbikeId', ParseIntPipe) motorbikeId: number,
    @Param('colorId', ParseIntPipe) colorId: number,
    @Body() imageDto: DeleteImageDto,
  ) {
    await this.imageServices.deleteColorImage(
      motorbikeId,
      colorId,
      imageDto.imageUrl,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Delete color image success',
      data: {},
    };
  }

  @Delete('motorbike/:imageId')
  @ApiOperation({ summary: 'Delete file image motorbike' })
  async deleteMotorbikeImage(
    @Param('imageId', ParseIntPipe) imageId: number,
    @Body() imageDto: DeleteImageDto,
  ) {
    await this.imageServices.deleteMotorbikeImage(imageId, imageDto.imageUrl);
    return {
      statusCode: HttpStatus.OK,
      message: 'Delete motorbike image success',
      data: {},
    };
  }

  @Post('customer-contract-document/:contractId')
  @ApiOperation({ summary: 'Upload multiple files document contract image' })
  @ApiResponseDocumentArray(
    HttpStatus.CREATED,
    ImageResponse,
    'Upload files success!',
  )
  @ApiFileUpload(CreateCustomerContractDocumentsDto)
  @UseInterceptors(FilesInterceptor('documentImages'))
  async uploadContractDocumentImages(
    @Param('contractId', ParseIntPipe) contractId: number,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() createContractDocument: CreateCustomerContractDocumentsDto,
  ) {
    const imageUrlLists = await this.imageServices.uploadContractFile(
      files,
      contractId,
      createContractDocument,
    );
    return {
      statusCode: HttpStatus.CREATED,
      data: imageUrlLists,
      message: 'Upload files success',
    };
  }

  @Delete('document-contract/:imageId')
  @ApiOperation({ summary: 'Delete file image document contract' })
  async deleteDocumentContractImage(
    @Param('imageId', ParseIntPipe) imageId: number,
    @Body() imageDto: DeleteImageDto,
  ) {
    await this.imageServices.deleteDocumentContract(imageId, imageDto.imageUrl);
    return {
      statusCode: HttpStatus.OK,
      message: 'Delete document image success',
      data: {},
    };
  }
}
