import { applyDecorators } from '@nestjs/common';
import { ApiQuery, ApiQueryOptions } from '@nestjs/swagger';

export function ApiQueriesMulti(...arg: ApiQueryOptions[]) {
  return applyDecorators(...arg.map((query) => ApiQuery(query)));
}
