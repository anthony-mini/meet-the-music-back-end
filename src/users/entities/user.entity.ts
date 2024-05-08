import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Role } from '../enums/role.enum';
import { Status } from '../enums/status.enum';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'firstName' })
  firstName: string;

  @Column({ name: 'lastName' })
  lastName: string;

  @Column({ name: 'email', unique: true })
  email: string;

  @Exclude()
  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'phone' })
  phone: string;

  @Column({ name: 'address' })
  address: string;

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
    name: 'Role',
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
}
