import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';

import { config } from 'dotenv';

config();

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    // Extension activations
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalInterceptors(
      new ClassSerializerInterceptor(app.get(Reflector)),
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
