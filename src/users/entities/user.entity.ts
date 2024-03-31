import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Role } from '../enums/role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ name: 'id_user' })
  id: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'email', unique: true })
  email: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'phone' })
  phone: string;

  @Column({
    type: 'enum',
    name: 'role',
    enum: ['admin', 'user'],
    default: 'user',
  })
  role: Role;
}
