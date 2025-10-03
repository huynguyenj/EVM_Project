import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { ValidationPipeException } from './validation-pipe.exception';
import { Request, Response } from 'express';

@Catch(ValidationPipeException)
export class ValidateExceptionFilter implements ExceptionFilter {
  private logger = new Logger();
  catch(exception: HttpException, host: ArgumentsHost) {
    const currentTransferMethod = host.switchToHttp();
    const response = currentTransferMethod.getResponse<Response>();
    const request = currentTransferMethod.getRequest<Request>();
    this.logger.error(`Wrong request body type with path: ${request.url}`);
    response.status(exception.getStatus()).json({
      statusCode: exception.getStatus(),
      message: exception.getResponse(),
      path: request.url,
    });
  }
}
