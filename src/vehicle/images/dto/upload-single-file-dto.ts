import { IsNotEmpty, IsString } from 'class-validator';

export class SingleFileUploadDto {
  @IsString()
  @IsNotEmpty()
  colorType: string;

  @IsString()
  @IsNotEmpty()
  motorbikeName: string;
}
