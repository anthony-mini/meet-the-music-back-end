import { IsEmail, IsNotEmpty, IsDefined, IsEnum } from 'class-validator';
import { Role } from '../enums/role.enum';

export class CreateUserDto {
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  password: string;

  @IsNotEmpty({ message: 'First name is required' })
  firstName: string;

  @IsNotEmpty({ message: 'Last name is required' })
  lastName: string;

  @IsNotEmpty({ message: 'Phone number is required' })
  phone: string;

  @IsDefined()
  @IsEnum(Role, { message: 'Invalid role specified' })
  role: Role;
}
