import { Module } from '@nestjs/common';
import { EstablishmentProfileService } from './establishment-profile.service';
import { EstablishmentProfileController } from './establishment-profile.controller';

@Module({
  controllers: [EstablishmentProfileController],
  providers: [EstablishmentProfileService],
})
export class EstablishmentProfileModule {}
