import { PaginationRequestQuery } from 'src/common/types';
import {
  QuotationStatus,
  QuotationType,
} from 'src/dealer-staff/quotation/types';

export class QuotationQueriesCustomerDto implements PaginationRequestQuery {
  limit: number;
  page: number;
  type?: QuotationType;
  status?: QuotationStatus;
  quoteCode?: string;
  agencyId?: number;
  sort: string;
}
