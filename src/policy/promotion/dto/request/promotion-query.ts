import { PaginationRequestQuery } from 'src/common/types';
import { PromotionValueType } from '../../types';

export class PromotionQueries implements PaginationRequestQuery {
  limit: number;
  page: number;
  valueType: PromotionValueType;
}
