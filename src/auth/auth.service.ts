import { User } from './../users/models/user.model';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { LoginDto } from './dto/login-auth.dto';
import { UsersService } from './../users/users.service';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt/dist';
@Injectable()
export class AuthService {
  constructor(
    private readonly UsersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async registration(userDto: CreateUserDto) {
    const condidate = await this.UsersService.getUserByEmail(userDto.email);
    if (condidate) {
      throw new HttpException(
        'Bunday foydalanuvchi mavjud',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashedPassword = await bcrypt.hash(userDto.password, 7);
    const user = await this.UsersService.createUser({
      ...userDto,
      password: hashedPassword,
    });
    return this.generateToken(user);
  }

  async login(LoginDto:LoginDto){
    const user = await this.validateUser(LoginDto);
    if(!user){
      throw new HttpException('foydalanuvchi topilmadi', HttpStatus.NOT_FOUND);
    }
    return this.generateToken(user);
  }

  private async validateUser(LoginDto: LoginDto) {
    const user = await this.UsersService.getUserByEmail(LoginDto.email);
    if(!user){
      throw new HttpException("email yoki parol notug'ri", HttpStatus.NOT_FOUND)
    }
    const validPassword = await bcrypt.compare(
      LoginDto.password,
      user.password,
    );
    if (validPassword) {
      return user;
    }
    throw new UnauthorizedException('email yoki parol noturi');
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return { token: this.jwtService.sign(payload) };
  }
}
