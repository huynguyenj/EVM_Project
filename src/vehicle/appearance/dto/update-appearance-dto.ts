import { IsNumber, IsOptional } from 'class-validator';

export class UpdateAppearanceDto {
  @IsNumber()
  @IsOptional()
  length?: number;

  @IsNumber()
  @IsOptional()
  width?: number;

  @IsNumber()
  @IsOptional()
  height?: number;

  @IsNumber()
  @IsOptional()
  weight?: number;

  @IsNumber()
  @IsOptional()
  undercarriageDistance?: number;

  @IsNumber()
  @IsOptional()
  storageLimit?: number;
}
