import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorExceptionFilter } from './common/exception/error.exception.filter';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import {
  HttpExceptionFilter,
  ValidateExceptionFilter,
  ValidationPipeException,
} from './common/exception';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpAdapter = app.get(HttpAdapterHost);
  const config = app.get(ConfigService);
  app.enableCors({
    origin: '*',
    allowedHeaders: '*',
    credential: true,
  });
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

  const swaggerConfig = new DocumentBuilder()
    .setTitle('EVM System') // Tên swagger
    .setDescription('API documents cho hệ thống EVM') //description
    .setVersion('1.0') //Version
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
        name: 'Authorization',
        description: 'Enter JWT token, e.g. Bearer <your_token>',
      },
      'access-token',
    ) //Bearer token set up
    .build();
  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
