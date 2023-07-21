import { ApiTags, ApiOperation } from '@nestjs/swagger/dist/decorators';
import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';
import { MachineService } from './machine.service';
import { Machine } from './models/machine.models';
@ApiTags('Machine')
@Controller('Machine')
export class MachineController {
  constructor(private readonly MachineService: MachineService) {}
  @ApiOperation({ summary: 'Machine yaratish' })
  @Post('create')
  async createMachine(@Body() createMachineDto: CreateMachineDto) {
    return this.MachineService.createMachine(createMachineDto);
    // return Machine;
  }
  @Get('all')
  async getAllMachine(): Promise<Machine[]> {
    return this.MachineService.getAllMachine();
  }

  @Get(':id')
  async getByIdMachine(@Param('id') id: string): Promise<Machine> {
    return this.MachineService.getByIdMachine(Number(id));
  }

  @Get(':name')
  async getMachineByName(@Param('name') name: string): Promise<Machine> {
    return this.MachineService.getByIdMachine(Number(name));
  }

  @Delete(':id')
  async DeleteMachineById(@Param('id') id: number): Promise<Machine> {
    return this.MachineService.getByIdMachine(Number(id));
  }
  @Put(':id')
  async updateMachine(
    @Param('id') id: number,
    @Body() updateMachineDto: UpdateMachineDto,
  ): Promise<Machine> {
    return this.MachineService.updateMachine(+id, updateMachineDto);
  }
}
