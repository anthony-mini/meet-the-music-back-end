import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import * as cors from 'cors';
import helmet from 'helmet';

import * as cookieParser from 'cookie-parser';

import { config } from 'dotenv';

config();

function getCorsOrigin() {
  const env = process.env.NODE_ENV;
  let origin: string;

  switch (env) {
    case 'staging':
      origin = 'https://staging.meetthemusic.fr';
      break;
    case 'production':
      origin = 'https://meetthemusic.fr';
      break;
    default:
      origin = 'http://localhost:4200';
      break;
  }

  return origin;
}

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    // Helmet security [https://docs.nestjs.com/security/helmet]
    app.use(helmet());

    // Use cookie-parser middleware
    app.use(cookieParser());

    // Extension activations
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalInterceptors(
      new ClassSerializerInterceptor(app.get(Reflector)),
    );
    app.use(
      cors({
        origin: getCorsOrigin(),
        method: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: [
          'Content-Type',
          'Authorization',
          'Cookie',
          'Set-Cookie',
        ],
        credentials: true,
      }),
    );

    // Opening of the port
    await app.listen(+process.env.PORT);
  } catch (error) {
    Logger.error(
      `Failed to bootstrap the application`,
      error.stack,
      'Bootstrap',
    );
  }
}
bootstrap();
