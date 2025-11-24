import { PaginationRequestQuery } from 'src/common/types';
import { PromotionStatus, PromotionValueType } from '../../types';

export class PromotionQueries implements PaginationRequestQuery {
  limit: number;
  page: number;
  valueType?: PromotionValueType;
  motorbikeId?: number;
  status?: PromotionStatus;
  sort: string;
}
