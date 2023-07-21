import { ActivateUserDto } from './dto/activate-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { RolesService } from './../roles/roles.service';
import {
  BadRequestException,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private readonly RolesService: RolesService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const newUser = await this.userRepository.create(createUserDto);
    const role = await this.RolesService.getRoleByValue('ADMIN');
    if (!role) {
      throw new BadRequestException('role not found');
    }
    await newUser.$set('roles', [role.id]);
    await newUser.save();

    return newUser;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }

  async addRole(addRoleDto: AddRoleDto) {
    const user = await this.userRepository.findByPk(addRoleDto.userId);
    const role = await this.RolesService.getRoleByValue(addRoleDto.value);

    if (role && user) {
      await user.$add('roles', role.id);
      const updatedUser = await this.userRepository.findByPk(
        addRoleDto.userId,
        {
          include: { all: true },
        },
      );

      return updatedUser;
    }
    throw new HttpException('foydalanuvchi topilmadi', HttpStatus.NOT_FOUND);
  }

  async removeRole(addRoleDto: AddRoleDto) {
    const user = await this.userRepository.findByPk(addRoleDto.userId);
    const role = await this.RolesService.getRoleByValue(addRoleDto.value);

    if (role && user) {
      await user.$remove('roles', role.id);
      const updatedUser = await this.userRepository.findByPk(
        addRoleDto.userId,
        {
          include: { all: true },
        },
      );

      return updatedUser;
    }
    throw new HttpException('foydalanuvchi topilmadi', HttpStatus.NOT_FOUND);
  }

  async activateUser(activateUserDto: ActivateUserDto) {
    const user = await this.userRepository.findByPk(activateUserDto.userId);

    if (!user) {
      throw new HttpException('foydalanuvchi topilmadi', HttpStatus.NOT_FOUND);
    }

    user.is_active = true;
    await user.save();
    return user;
  }
  async deactivateUser(activateUserDto: ActivateUserDto) {
    const user = await this.userRepository.findByPk(activateUserDto.userId);

    if (!user) {
      throw new HttpException('foydalanuvchi topilmadi', HttpStatus.NOT_FOUND);
    }

    user.is_active = false;
    await user.save();
    return user;
  }
  findAllUsers() {
    return this.userRepository.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
