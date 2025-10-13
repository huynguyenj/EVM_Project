import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { SupabaseFileModule } from 'src/supabase/file/supabase.file.module';
import { COLOR_IMAGE_DIR, COMMON_IMAGE_DIR } from './constant/file-name';
import { MotorbikeModule } from '../electric-motorbike/motorbike.module';
import { ColorModule } from '../color/color.module';

@Module({
  imports: [SupabaseFileModule, MotorbikeModule, ColorModule],
  controllers: [ImagesController],
  providers: [
    {
      provide: 'COMMON_DIR',
      useValue: COMMON_IMAGE_DIR,
    },
    {
      provide: 'COLOR_DIR',
      useValue: COLOR_IMAGE_DIR,
    },
    ImagesService,
  ],
})
export class ImagesModule {}
