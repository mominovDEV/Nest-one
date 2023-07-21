import { IsString,IsNotEmpty,IsEmail,IsStrongPassword } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsStrongPassword()
  password: string;
}
