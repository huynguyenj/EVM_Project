import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost } from '@nestjs/core';
import { Request } from 'express';

@Catch(Error)
export class ErrorExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(); // no need to use DI because this class will default use this.
  constructor(
    private httpAdapterHost: HttpAdapterHost,
    private configService: ConfigService,
  ) {}
  catch(exception: Error, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const currentTransferMethod = host.switchToHttp();
    const request = currentTransferMethod.getRequest<Request>();
    const isProduction =
      this.configService.get<string>('NODE') === 'production';
    const responseBody = isProduction
      ? {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: exception.message,
          path: request.url,
        }
      : {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: exception.message,
          path: request.url,
          stack: exception.stack,
        };
    this.logger.error(`Path ${request.url} error: ${exception.message}`);
    httpAdapter.reply(
      currentTransferMethod.getResponse(),
      responseBody,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
