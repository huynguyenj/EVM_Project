import { PaginationRequestQuery } from 'src/common/types';
import { DiscountStatus, DiscountType, ValueType } from '../../types';

export class DiscountQueries implements PaginationRequestQuery {
  limit: number;
  page: number;
  type?: DiscountType;
  valueType?: ValueType;
  agencyId?: number;
  motorbikeId?: number;
  status?: DiscountStatus;
}
