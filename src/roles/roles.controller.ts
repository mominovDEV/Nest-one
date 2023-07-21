import { ApiOperation, ApiTags } from '@nestjs/swagger/dist/decorators';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}
  @ApiOperation({ summary: 'Roles yaratish' })
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
