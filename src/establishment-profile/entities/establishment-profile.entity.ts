import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { SocialMedia } from '../../social-media/entites/social-media.entity';

@Entity('establishmentProfile')
export class EstablishmentProfile {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @OneToOne(() => User, (user) => user.establishmentProfile)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ name: 'description' })
  description: string;

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

  @OneToMany(
    () => SocialMedia,
    (socialMedia) => socialMedia.establishmentProfile,
  )
  socialMedia: SocialMedia;
}
