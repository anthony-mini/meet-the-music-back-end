import { IsEmail, IsNotEmpty, IsDefined } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  phone: string;

  @IsDefined()
  role: string;
}
