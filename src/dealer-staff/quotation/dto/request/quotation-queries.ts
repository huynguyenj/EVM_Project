import { PaginationRequestQuery } from 'src/common/types';
import { QuotationStatus, QuotationType } from '../../types';

export class QuotationQueriesDto implements PaginationRequestQuery {
  limit: number;
  page: number;
  type?: QuotationType;
  status?: QuotationStatus;
  quoteCode?: string;
  customerId?: number;
}
