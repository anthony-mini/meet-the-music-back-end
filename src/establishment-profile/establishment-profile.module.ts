import { Module } from '@nestjs/common';
import { EstablishmentProfileService } from './establishment-profile.service';
import { EstablishmentProfileController } from './establishment-profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstablishmentProfile } from './entities/establishment-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EstablishmentProfile])],
  controllers: [EstablishmentProfileController],
  providers: [EstablishmentProfileService],
})
export class EstablishmentProfileModule {}
