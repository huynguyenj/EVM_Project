import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(); // no need to use DI because this class will default use this.
  constructor(
    private httpAdapterHost: HttpAdapterHost,
    private configService: ConfigService,
  ) {}
  catch(exception: any, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const currentTransferMethod = host.switchToHttp();
    const path = currentTransferMethod.getRequest<Request>().url;

    const isProduction =
      this.configService.get<string>('NODE') === 'production';
    let responseBody = {};
    if (exception instanceof HttpException) {
      console.log(exception.getResponse())
      responseBody = !isProduction
        ? {
            statusCode: exception.getStatus(),
            message: exception.message,
            path: path,
            timeStamp: new Date().toLocaleDateString(),
          }
        : {
            statusCode: exception.getStatus(),
            message: exception.message,
            path: path,
            timeStamp: new Date().toLocaleDateString(),
            stack: exception.stack,
          };
      this.logger.error(`Status: ${exception.getStatus()} with path: ${path}`);
    } else if (exception instanceof Error) {
      responseBody = {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        timestamp: new Date().toISOString(),
        path: path,
      };
      this.logger.error(
        `Status: ${HttpStatus.INTERNAL_SERVER_ERROR} with path: ${path}, error: ${exception.message}`,
      );
    }
    httpAdapter.reply(currentTransferMethod.getResponse(), responseBody);
  }
}
