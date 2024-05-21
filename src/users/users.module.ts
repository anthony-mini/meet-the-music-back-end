import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ArtistProfile } from 'src/artist-profile/entities/artist-profile.entity';
import { EstablishmentProfile } from 'src/establishment-profile/entities/establishment-profile.entity';
import { SocialMedia } from 'src/social-media/entites/social-media.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      ArtistProfile,
      EstablishmentProfile,
      SocialMedia,
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
