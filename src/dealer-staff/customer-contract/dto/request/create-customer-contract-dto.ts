import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { ContractPaidType } from '../../types';

export class CreateCustomerContractDto {
  @ApiProperty({ example: 'Contract for motorbike with customer John' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Contract create for motorbike' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ example: 155000 })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  finalPrice: number;

  @ApiProperty({ example: ContractPaidType.FULL })
  @IsEnum(ContractPaidType)
  @IsNotEmpty()
  contractPaidType: ContractPaidType;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  customerId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  staffId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  agencyId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  electricMotorbikeId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  colorId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  quotationId: number;
}
