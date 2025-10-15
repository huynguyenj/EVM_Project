import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiResponseDocument = (
  httpStatus: HttpStatus,
  type: Type<any>,
  message?: string,
) => {
  return applyDecorators(
    ApiExtraModels(type),
    ApiResponse({
      status: httpStatus,
      description: message,
      content: {
        'application/json': {
          schema: {
            properties: {
              statusCode: { type: 'number', example: httpStatus },
              message: { type: 'string', example: message },
              data: { $ref: getSchemaPath(type) },
            },
          },
        },
      },
    }),
  );
};
