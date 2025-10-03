import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAppearanceDto {
  @IsNumber()
  @IsNotEmpty()
  length: number;

  @IsNumber()
  @IsNotEmpty()
  width: number;

  @IsNumber()
  @IsNotEmpty()
  height: number;

  @IsNumber()
  @IsNotEmpty()
  weight: number;

  @IsNumber()
  @IsNotEmpty()
  undercarriageDistance: number;

  @IsNumber()
  @IsNotEmpty()
  storageLimit: number;
}
