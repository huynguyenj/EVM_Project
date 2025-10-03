import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorExceptionFilter } from './exception/error.exception.filter';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import {
  HttpExceptionFilter,
  ValidateExceptionFilter,
  ValidationPipeException,
} from './exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpAdapter = app.get(HttpAdapterHost);
  const config = app.get(ConfigService);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (validationErrors: ValidationError[]) => {
        return new ValidationPipeException(
          validationErrors.map((error) => ({
            field: error.property,
            error: Object.values(error.constraints || []),
          })),
        );
      },
    }),
  );
  app.use(cookieParser());
  app.useGlobalFilters(
    new ErrorExceptionFilter(httpAdapter, config),
    new HttpExceptionFilter(httpAdapter, config),
    new ValidateExceptionFilter(),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
