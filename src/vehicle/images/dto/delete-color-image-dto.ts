import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteColorImageDto {
  @IsString()
  @IsNotEmpty()
  imageUrl: string;
}
