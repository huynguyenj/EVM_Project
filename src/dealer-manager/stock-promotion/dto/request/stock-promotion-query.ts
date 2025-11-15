import { PaginationRequestQuery } from 'src/common/types';
import { StockPromotionStatus, StockPromotionValueType } from '../../types';

export class StockPromotionQueries implements PaginationRequestQuery {
  limit: number;
  page: number;
  valueType?: StockPromotionValueType;
  status?: StockPromotionStatus;
  sort: string;
}
