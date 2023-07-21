import { ActivateUserDto } from './dto/activate-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './models/user.model';
import { ApiOperation, ApiTags } from '@nestjs/swagger/dist/decorators';
import { ApiResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';


@ApiTags('Foydalanuvchilar')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Foydalanuvchi yaratish' })
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }
  @ApiOperation({ summary: 'Foydalanuvchilarni kurish' })
  @ApiResponse({status:200,description:"List of users",type:[User]})
  @Get()
  findAllUsers(): Promise<User[]> {
    return this.usersService.findAllUsers();
  }
  @ApiOperation({ summary: 'Foydalanuvchini idsi bilan kurish' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
  @ApiOperation({ summary: 'Foydalanuvchini idsi bilan uzgartirish' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }
  @ApiOperation({ summary: 'Foydalanuvchini idsi bilan  uchirish' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @ApiOperation({ summary: 'Role qushish' })
  @HttpCode(200)
  @Post('add_role')
  addRole(@Body() addRoleDto: AddRoleDto) {
    return this.usersService.addRole(addRoleDto);
  }

  @ApiOperation({ summary: 'Role uchirish' })
  @HttpCode(200)
  @Post('remove_role')
  removeRole(@Body() addRoleDto: AddRoleDto) {
    return this.usersService.removeRole(addRoleDto);
  }
  @ApiOperation({ summary: 'Activate qilish' })
  @HttpCode(200)
  @Post('activate')
  activateUseer(@Body() activateUserDto: ActivateUserDto) {
    return this.usersService.activateUser(activateUserDto);
  }
  @ApiOperation({ summary: 'DeActivate qilish' })
  @HttpCode(200)
  @Post('deactivate')
  deactivateUseer(@Body() activateUserDto: ActivateUserDto) {
    return this.usersService.deactivateUser(activateUserDto);
  }
}
