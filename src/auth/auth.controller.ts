import { ApiTags, ApiOperation } from '@nestjs/swagger/dist/decorators';
import { Controller, Post, Body, HttpCode} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiOperation({ summary: 'Auth yaratish' })
  @Post('/registration')
  registration(@Body() CreateUserDto: CreateUserDto) {
    return this.authService.registration(CreateUserDto);
  }
  @HttpCode(200)
  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}

