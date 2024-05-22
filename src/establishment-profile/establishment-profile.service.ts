import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { EstablishmentProfile } from './entities/establishment-profile.entity';

@Injectable()
export class EstablishmentProfileService {
  constructor(
    @InjectRepository(EstablishmentProfile)
    private establishmentProfileRepository: Repository<EstablishmentProfile>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getEstablishmentProfile(alias: string): Promise<EstablishmentProfile> {
    const user = await this.userRepository.findOne({
      where: { alias: alias },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const establishmentProfile =
      await this.establishmentProfileRepository.findOne({
        where: { user: { id: user.id } },
        relations: ['user', 'socialMedia'],
      });

    if (!establishmentProfile) {
      throw new Error('Establishment profile not found');
    }

    return establishmentProfile;
  }
}
