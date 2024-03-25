import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

import { config } from 'dotenv';

config();

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    await app.listen(+process.env.PORT || 3000);
  } catch (error) {
    Logger.error(
      `Failed to bootstrap the application`,
      error.stack,
      'Bootstrap',
    );
  }
}
bootstrap();
