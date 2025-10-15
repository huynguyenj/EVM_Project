import { applyDecorators } from '@nestjs/common';
import { ApiQuery, ApiQueryOptions } from '@nestjs/swagger';

export function ApiQueriesAndPagination(...arg: ApiQueryOptions[]) {
  return applyDecorators(
    ApiQuery({ name: 'limit', required: false, type: Number, example: 5 }),
    ApiQuery({ name: 'page', required: false, type: Number, example: 1 }),
    ...arg.map((query) => ApiQuery(query)),
  );
}
