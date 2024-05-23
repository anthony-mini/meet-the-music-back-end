import { Module } from '@nestjs/common';
import { TokenController } from './token/token.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { ArtistProfile } from '../artist-profile/entities/artist-profile.entity';
import { EstablishmentProfile } from 'src/establishment-profile/entities/establishment-profile.entity';
import { SocialMedia } from 'src/social-media/entites/social-media.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forFeature([
      User,
      ArtistProfile,
      EstablishmentProfile,
      SocialMedia,
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        audience: process.env.JWT_AUDIENCE,
        algorithm: 'HS256',
      },
    }),
  ],
  controllers: [TokenController],
  providers: [UsersService],
})
export class AuthModule {}
