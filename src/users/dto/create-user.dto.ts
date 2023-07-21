import { ApiProperty } from '@nestjs/swagger/dist';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsStrongPassword,
} from 'class-validator';
export class CreateUserDto {
  @ApiProperty({ example: 'user1', description: 'Foydalanuvchi nomi' })
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty({
    example: 'user1@gmail.com',
    description: 'Foydalanuvchi emaili',
  })
  @IsEmail()
  email: string;
  @ApiProperty({ example: 'Uzbek1$t0n', description: 'Foydalanuvchi paroli' })

  //   @IsStrongPassword()
  @IsStrongPassword({ minLength: 6 })
  password: string;
}
