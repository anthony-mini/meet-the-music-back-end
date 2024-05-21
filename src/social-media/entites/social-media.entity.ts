import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ArtistProfile } from '../../artist-profile/entities/artist-profile.entity';
import { SocialMediaName } from '../enums/socialMediaName.enum';
import { EstablishmentProfile } from '../../establishment-profile/entities/establishment-profile.entity';

@Entity('socialMedia')
export class SocialMedia {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ManyToOne(
    () => ArtistProfile,
    (artistProfile) => artistProfile.socialMedia,
    { nullable: true },
  )
  @JoinColumn({ name: 'artistProfileId' })
  artistProfile: ArtistProfile;

  @ManyToOne(
    () => EstablishmentProfile,
    (establishmentProfile) => establishmentProfile.socialMedia,
    { nullable: true },
  )
  @JoinColumn({ name: 'establishmentProfileId' })
  establishmentProfile: EstablishmentProfile;

  @Column({
    name: 'socialMediaName',
    type: 'enum',
    enum: [
      SocialMediaName.INSTAGRAM,
      SocialMediaName.FACEBOOK,
      SocialMediaName.TWITTER,
      SocialMediaName.YOUTUBE,
      SocialMediaName.LINKEDIN,
      SocialMediaName.TIKTOK,
      SocialMediaName.SNAPCHAT,
      SocialMediaName.WHATSAPP,
      SocialMediaName.DISCORD,
      SocialMediaName.SPOTIFY,
      SocialMediaName.SOUNDCLOUD,
    ],
    nullable: true,
  })
  socialMediaName: SocialMediaName;

  @Column({ name: 'url', nullable: true })
  url: string;

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
