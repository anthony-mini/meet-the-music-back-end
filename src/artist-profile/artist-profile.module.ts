import { Module } from '@nestjs/common';
import { ArtistProfileController } from './artist-profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistProfile } from './entities/artist-profile.entity';
import { ArtistProfileService } from './artist-profile.service';

@Module({
  imports: [TypeOrmModule.forFeature([ArtistProfile])],
  controllers: [ArtistProfileController],
  providers: [ArtistProfileService],
})
export class ArtistProfileModule {}
