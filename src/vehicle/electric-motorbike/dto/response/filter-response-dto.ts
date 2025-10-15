import { ApiResponseProperty } from '@nestjs/swagger';

class ModelFilter {
  model: string;
}

class MakeFromFilter {
  makeFrom: string;
}
export class FilterResponseDto {
  @ApiResponseProperty({
    example: [{ model: 'Model X' }, { model: 'Model Y' }],
    type: Array,
  })
  modelFilter: ModelFilter[];
  @ApiResponseProperty({
    example: [{ makeFrom: 'China' }, { model: 'VietNam' }],
    type: Array,
  })
  makeFromFilter: MakeFromFilter[];
}
