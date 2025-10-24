import { PaginationRequestQuery } from 'src/common/types';
import { DriveTrailStatus } from '../../types';

export class DriveTrialQueries implements PaginationRequestQuery {
  limit: number;
  page: number;
  email?: string;
  phone?: string;
  fullname?: string;
  status?: DriveTrailStatus;
}
