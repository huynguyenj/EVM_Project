import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(); // no need to use DI because this class will default use this.
  constructor(private httpAdapterHost: HttpAdapterHost) {}
  catch(exception: any, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const currentTransferMethod = host.switchToHttp();
    const httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    this.logger.error(`Error message: ${exception.message}`);
    const responseBody = {
      statusCode: httpStatus,
      message: 'Something wrong with internal server!',
      timeStamp: new Date().toLocaleDateString(),
    };
    httpAdapter.reply(
      currentTransferMethod.getResponse(),
      responseBody,
      httpStatus,
    );
  }
}
