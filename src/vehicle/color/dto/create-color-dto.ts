import { IsNotEmpty, IsString } from 'class-validator';

export class CreateColorDto {
  @IsString()
  @IsNotEmpty()
  colorType: string;
}
