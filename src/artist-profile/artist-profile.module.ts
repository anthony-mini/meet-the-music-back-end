import { Module } from '@nestjs/common';
import { ArtistProfileController } from './artist-profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistProfile } from './entities/artist-profile.entity';
import { ArtistProfileService } from './artist-profile.service';
import { SocialMedia } from 'src/social-media/entites/social-media.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArtistProfile, SocialMedia, User])],
  controllers: [ArtistProfileController],
  providers: [ArtistProfileService],
})
export class ArtistProfileModule {}
