import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto';

export const ApiResponseDocumentPagination = (
  httpStatus: HttpStatus,
  type: Type<any>,
  message?: string,
) => {
  return applyDecorators(
    ApiExtraModels(PaginationDto, type),
    ApiResponse({
      status: httpStatus,
      description: message,
      content: {
        'application/json': {
          schema: {
            allOf: [
              {
                properties: {
                  statusCode: { type: 'number', example: httpStatus },
                  message: { type: 'string', example: message },
                  data: { type: 'array', items: { $ref: getSchemaPath(type) } },
                },
              },
              {
                properties: {
                  paginationInfo: {
                    type: 'object',
                    $ref: getSchemaPath(PaginationDto),
                  },
                },
              },
            ],
          },
        },
      },
    }),
  );
};
