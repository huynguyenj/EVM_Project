import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exception-filter/http.exception.filter';
import { AllExceptionFilter } from './exception-filter/all.exception.filter';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpAdapter = app.get(HttpAdapterHost);
  const config = app.get(ConfigService);
  app.use(cookieParser());
  app.useGlobalFilters(
    new HttpExceptionFilter(config),
    new AllExceptionFilter(httpAdapter),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
