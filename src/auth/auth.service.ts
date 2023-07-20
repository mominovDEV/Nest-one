import { UsersService } from './../users/users.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/models/user.model';
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

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return {token:this.jwtService.sign(payload)}
  }
}
