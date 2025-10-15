import { applyDecorators, Type } from '@nestjs/common';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

export function ApiFileUpload(type: Type<any>) {
  return applyDecorators(
    ApiConsumes('multipart/form-data'),
    ApiBody({
      description: 'File upload',
      type: type,
    }),
  );
}
