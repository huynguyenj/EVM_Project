import { ApiProperty } from '@nestjs/swagger';
import { BillEnum } from '../../types';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class CreateBillOrder {
  @ApiProperty({ example: BillEnum.FULL })
  @IsEnum(BillEnum)
  @IsNotEmpty()
  type: BillEnum;
}
