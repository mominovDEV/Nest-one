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

@Controller('Machine')
export class MachineController {
  constructor(private readonly MachineService: MachineService) {}

  @Post('create')
  async createMachine(@Body() CreateMachineDto: CreateMachineDto) {
    return this.MachineService.createMachine(CreateMachineDto);
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
    @Body() UpdateMachineDto: UpdateMachineDto,
  ): Promise<Machine> {
    return this.MachineService.updateMachine(+id, UpdateMachineDto);
  }
}
