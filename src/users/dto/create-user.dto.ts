import { IsEmail, IsNotEmpty, IsDefined, IsEnum } from 'class-validator';
import { Role } from '../enums/role.enum';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Last name is required' })
  lastName: string;

  @IsNotEmpty({ message: 'First name is required' })
  firstName: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  password: string;

  @IsDefined()
  @IsEnum(Role, { message: 'Invalid role specified' })
  role: Role;

  @IsDefined()
  zipCode: string;

  @IsDefined()
  city: string;

  phone: string;

  address: string;
}
