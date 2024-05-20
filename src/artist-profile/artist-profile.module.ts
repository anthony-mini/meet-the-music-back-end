import { Module } from '@nestjs/common';
import { ArtistProfileController } from './artist-profile.controller';

@Module({
  controllers: [ArtistProfileController],
})
export class ArtistProfileModule {}
