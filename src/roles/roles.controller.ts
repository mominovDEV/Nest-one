import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.createRole(createRoleDto);
  }

  // @Get()
  // GetAllRole() {
  //   return this.rolesService.findAll();
  // }

  // @Get(':value')
  // getRoleByValue(@Param('value') value: string) {
  //   return this.rolesService.findOne(value);
  // }
}
