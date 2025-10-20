import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { InstallmentContractStatus, PenaltyType } from '../../types';

export class UpdateInstallmentContractDto {
  @ApiProperty({ example: 500 })
  @IsNumber()
  @IsOptional()
  penaltyValue?: number;

  @ApiProperty({ example: PenaltyType.FIXED })
  @IsEnum(PenaltyType)
  @IsOptional()
  penaltyType?: PenaltyType;

  @ApiProperty({ example: InstallmentContractStatus.ACTIVE })
  @IsEnum(InstallmentContractStatus)
  @IsOptional()
  status?: InstallmentContractStatus;
}
