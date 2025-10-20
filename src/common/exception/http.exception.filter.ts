import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost } from '@nestjs/core';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger();
  constructor(
    private httpAdapterHost: HttpAdapterHost,
    private configService: ConfigService,
  ) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const currentTransferMethod = host.switchToHttp();
    const request = currentTransferMethod.getRequest<Request>();
    const isProduction =
      this.configService.get<string>('NODE') === 'production';
    const responseBody = isProduction
      ? {
          statusCode: exception.getStatus(),
          message: exception.message,
          path: request.url,
          timeStamp: new Date().toLocaleDateString(),
        }
      : {
          statusCode: exception.getStatus(),
          message: exception.message,
          path: request.url,
          timeStamp: new Date().toLocaleDateString(),
          stack: exception.stack,
        };
    this.logger.error(
      `HTTP request ${request.url} error: ${exception.message}`,
    );
    httpAdapter.reply(
      currentTransferMethod.getResponse(),
      responseBody,
      exception.getStatus(),
    );
  }
}
