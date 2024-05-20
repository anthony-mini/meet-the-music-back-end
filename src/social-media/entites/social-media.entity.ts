import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ArtistProfile } from '../../artist-profile/entities/artist-profile.entity';

@Entity('socialMedia')
export class SocialMedia {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name', nullable: true })
  url: string;

  @ManyToMany(() => ArtistProfile, (artistProfile) => artistProfile.socialMedia)
  @JoinColumn({ name: 'artistProfileId' })
  artistProfile: ArtistProfile;

  @Column({
    name: 'createdAt',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    name: 'updatedAt',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
