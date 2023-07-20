import { Controller, Post, Body} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/registration')
  registration(@Body() CreateUserDto: CreateUserDto) {
    return this.authService.registration(CreateUserDto);
  }
}
