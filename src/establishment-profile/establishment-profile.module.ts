import { Module } from '@nestjs/common';
import { EstablishmentProfileService } from './establishment-profile.service';
import { EstablishmentProfileController } from './establishment-profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstablishmentProfile } from './entities/establishment-profile.entity';
import { SocialMedia } from 'src/social-media/entites/social-media.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EstablishmentProfile, SocialMedia, User]),
  ],
  controllers: [EstablishmentProfileController],
  providers: [EstablishmentProfileService],
})
export class EstablishmentProfileModule {}
