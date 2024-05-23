import { Controller, Get, Param } from '@nestjs/common';
import { ArtistProfileService } from './artist-profile.service';

@Controller('artist-profile')
export class ArtistProfileController {
  constructor(private readonly artistProfileService: ArtistProfileService) {}

  @Get('/:alias')
  findArtistProfileByAlias(@Param('alias') alias: string) {
    return this.artistProfileService.getArtistProfile(alias);
  }
}
