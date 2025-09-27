import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private config: ConfigService) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const currentTransferMethod = host.switchToHttp();
    const response = currentTransferMethod.getResponse<Response>();
    const request = currentTransferMethod.getRequest<Request>();
    const status = exception.getStatus();
    const path = request.url;
    const isProduction = this.config.get<string>('NODE') === 'production';
    const responseBody = !isProduction
      ? {
          statusCode: status,
          message: exception.message,
          path: path,
          timeStamp: new Date().toLocaleDateString(),
        }
      : {
          statusCode: status,
          message: exception.message,
          path: path,
          timeStamp: new Date().toLocaleDateString(),
          stack: exception.stack,
        };
    response.status(status).json(responseBody);
  }
}
