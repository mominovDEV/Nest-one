import { IsString, IsNotEmpty } from 'class-validator';


export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  value: string;
  @IsNotEmpty()
  @IsString()
  description: string;
}
