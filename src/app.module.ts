import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { ArtistProfileModule } from './artist-profile/artist-profile.module';
import { SocialMediaModule } from './social-media/social-media.module';
import { EstablishmentProfileModule } from './establishment-profile/establishment-profile.module';

function getSSLConfig() {
  const env = process.env.NODE_ENV;
  let rejectUnauthorized = false;

  if (env === 'staging' || env === 'production') {
    rejectUnauthorized = true;
  }

  return {
    rejectUnauthorized,
    ca: process.env.CA_CERT,
  };
}

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 600, // seconds (10 minutes)
        limit: 100, // limit requests
      },
    ]),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      schema: process.env.DB_SCHEMA_APP_MODULE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: false,
      synchronize: false,
      ssl: getSSLConfig(),
    }),
    UsersModule,
    AuthModule,
    ArtistProfileModule,
    SocialMediaModule,
    EstablishmentProfileModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_GUARD',
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
