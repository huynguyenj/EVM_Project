import { IsOptional, IsString } from 'class-validator';

export class UpdateSafeFeatureDto {
  @IsString()
  @IsOptional()
  brake?: string;

  @IsString()
  @IsOptional()
  lock?: string;
}
