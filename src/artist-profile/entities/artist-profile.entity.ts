import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class ArtistProfile {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @OneToOne(() => User, (user) => user.artistProfile)
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
}
