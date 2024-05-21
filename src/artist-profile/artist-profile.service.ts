import { InjectRepository } from '@nestjs/typeorm';
import { ArtistProfile } from './entities/artist-profile.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ArtistProfileService {
  constructor(
    @InjectRepository(ArtistProfile)
    private artistProfileRepository: Repository<ArtistProfile>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getArtistProfile(
    alias: string,
  ): Promise<{ artistProfile: ArtistProfile; initials: string }> {
    const user = await this.userRepository.findOne({
      where: { alias: alias },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const artistProfile = await this.artistProfileRepository.findOne({
      where: { user: { id: user.id } },
      relations: ['user', 'socialMedia'],
    });

    if (!artistProfile) {
      throw new Error('Artist profile not found');
    }

    const initials = (user.firstName[0] + user.lastName[0]).toUpperCase();

    return { artistProfile, initials };
  }
}
