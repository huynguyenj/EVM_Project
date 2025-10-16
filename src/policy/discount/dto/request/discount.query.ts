import { PaginationRequestQuery } from 'src/common/types';
import { DiscountType, ValueType } from '../../types';

export class DiscountQueries implements PaginationRequestQuery {
  limit: number;
  page: number;
  type: DiscountType;
  valueType: ValueType;
}
