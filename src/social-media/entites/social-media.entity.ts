import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ArtistProfile } from '../../artist-profile/entities/artist-profile.entity';
import { SocialMediaName } from '../enums/socialMediaName.enum';

/**
 * Composite key for the SocialMedia entity that includes the socialMediaName and artistProfileId.
 */
@Entity('socialMedia')
export class SocialMedia {
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
  })
  @PrimaryColumn()
  socialMediaName: SocialMediaName;

  @ManyToOne(() => ArtistProfile, (artistProfile) => artistProfile.socialMedia)
  @JoinColumn({ name: 'artistProfileId' })
  artistProfile: ArtistProfile;
  @PrimaryColumn()
  artistProfileId: number;

  @Column({ name: 'url' })
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
