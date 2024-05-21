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
import { EstablishmentType } from '../enums/establishment-type.enum';

@Entity('establishmentProfile')
export class EstablishmentProfile {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @OneToOne(() => User, (user) => user.establishmentProfile)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ name: 'description', nullable: true })
  description: string;

  @Column({
    name: 'capacity',
    nullable: true,
  })
  capacity: number;

  @Column({
    name: 'address',
    nullable: true,
  })
  address: string;

  @Column({
    name: 'phone',
    nullable: true,
  })
  phone: string;

  @Column({
    name: 'email',
    nullable: true,
  })
  email: string;

  @Column({
    name: 'website',
    nullable: true,
  })
  website: string;

  @Column({
    name: 'zipCode',
    nullable: true,
  })
  zipCode: number;

  @Column({
    name: 'city',
    nullable: true,
  })
  city: string;

  @Column({
    type: 'enum',
    name: 'type',
    enum: [
      EstablishmentType.BAR,
      EstablishmentType.RESTAURANT,
      EstablishmentType.CLUB,
      EstablishmentType.PUB,
      EstablishmentType.LOUNGE,
      EstablishmentType.CAFE,
    ],
  })
  type: EstablishmentType;

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
