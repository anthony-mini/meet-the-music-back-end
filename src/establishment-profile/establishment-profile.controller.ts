import { Controller, Get, Param } from '@nestjs/common';
import { EstablishmentProfileService } from './establishment-profile.service';

@Controller('establishment-profile')
export class EstablishmentProfileController {
  constructor(
    private readonly establishmentProfileService: EstablishmentProfileService,
  ) {}

  @Get('/:alias')
  findEstablishmentProfileByAlias(@Param('alias') alias: string) {
    return this.establishmentProfileService.getEstablishmentProfile(alias);
  }
}
