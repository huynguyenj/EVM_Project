import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export class CorsConfig {
  private static readonly ALLOWED_ORIGINS = [
    'http://localhost:5173',
    'https://wdp-391-fe.vercel.app',
  ];
  static getCorsOptions(): CorsOptions {
    return {
      origin: (origin, callback) => {
        if (!origin || this.ALLOWED_ORIGINS.includes(origin)) {
          return callback(null, true);
        } else {
          const error = new Error(
            `Origin ${origin} not allowed by CORS policy`,
          );
          return callback(error, false);
        }
      },
      optionsSuccessStatus: 200,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
      allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'Accept',
        'Origin',
        'Access-Control-Allow-Headers',
      ],
    };
  }
}
