import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Role } from '../enums/role.enum';
import { Status } from '../enums/status.enum';
import { Exclude } from 'class-transformer';
import { ArtistProfile } from '../../artist-profile/entities/artist-profile.entity';
import { EstablishmentProfile } from '../../establishment-profile/entities/establishment-profile.entity';

@Entity({ name: 'user', schema: 'app' })
export class User {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'alias', unique: true })
  alias: string;

  @Column({ name: 'email', unique: true })
  email: string;

  @Column({ name: 'firstName' })
  firstName: string;

  @Column({ name: 'lastName' })
  lastName: string;

  @Exclude()
  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'phone', nullable: true })
  phone: string;

  @Column({ name: 'address', nullable: true })
  address: string;

  @Column({ name: 'zipCode' })
  zipCode: string;

  @Column({ name: 'city' })
  city: string;

  @Column({ name: 'isVerifyEmail', default: true })
  isVerifyEmail: boolean;

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

  @Column({
    type: 'enum',
    name: 'role',
    enum: ['admin', 'artist', 'promoter', 'user'],
    default: Role.USER,
  })
  role: Role;

  @Column({
    type: 'enum',
    name: 'status',
    enum: ['active', 'inactive', 'suspended'],
    default: Status.ACTIVE,
  })
  status: Status;

  @OneToOne(() => ArtistProfile, (artistProfile) => artistProfile.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  artistProfile: ArtistProfile;

  @OneToOne(
    () => EstablishmentProfile,
    (establishmentProfile) => establishmentProfile.user,
    {
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  establishmentProfile: EstablishmentProfile;
}
