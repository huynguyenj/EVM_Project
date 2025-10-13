import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { DeleteColorImageDto } from './dto/delete-color-image-dto';

@Controller('images')
export class ImagesController {
  constructor(private imageServices: ImagesService) {}

  @Post('motorbike-color/:motorbikeId/:colorId')
  @UseInterceptors(FileInterceptor('color-image'))
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
      data: imageUrl,
      message: 'Upload image success!',
    };
  }

  @Post('motorbike/:motorbikeId')
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
      data: imageUrlLists,
      message: 'Upload file success',
    };
  }

  @Delete('color/:motorbikeId/:colorId')
  async deleteColorImage(
    @Param('motorbikeId', ParseIntPipe) motorbikeId: number,
    @Param('colorId', ParseIntPipe) colorId: number,
    @Body() imageDto: DeleteColorImageDto,
  ) {
    await this.imageServices.deleteColorImage(
      motorbikeId,
      colorId,
      imageDto.imageUrl,
    );
    return {
      message: 'Delete color image success',
    };
  }

  @Delete('motorbike/:imageId')
  async deleteMotorbikeImage(
    @Param('imageId', ParseIntPipe) imageId: number,
    @Body() imageDto: DeleteColorImageDto,
  ) {
    await this.imageServices.deleteMotorbikeImage(imageId, imageDto.imageUrl);
    return {
      message: 'Delete motorbike image success',
    };
  }
}
