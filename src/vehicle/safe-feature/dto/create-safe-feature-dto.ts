import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSafeFeatureDto {
  @IsString()
  @IsNotEmpty()
  brake: string;

  @IsString()
  @IsNotEmpty()
  lock: string;
}
