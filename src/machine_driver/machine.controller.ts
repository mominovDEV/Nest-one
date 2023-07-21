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
import { MachineDriver } from './models/machine.models';
@ApiTags("Machine Driver")
@Controller('Machine')
export class MachineController {
  constructor(private readonly MachineService: MachineService) {}

  @ApiOperation({summary:'Machine Driver yaratish'})
  @Post('create')
  async createMachine(@Body() CreateMachineDto: CreateMachineDto) {
    return this.MachineService.createMachine(CreateMachineDto);
    // return Machine;
  }
  @Get('all')
  async getAllMachine(): Promise<MachineDriver[]> {
    return this.MachineService.getAllMachine();
  }

  @Get(':id')
  async getByIdMachine(@Param('id') id: string): Promise<MachineDriver> {
    return this.MachineService.getByIdMachine(Number(id));
  }

  @Get(':name')
  async getMachineByName(@Param('name') name: string): Promise<MachineDriver> {
    return this.MachineService.getByIdMachine(Number(name));
  }

  @Delete(':id')
  async DeleteMachineById(@Param('id') id: number): Promise<MachineDriver> {
    return this.MachineService.getByIdMachine(Number(id));
  }
  @Put(':id')
  async updateMachine(
    @Param('id') id: number,
    @Body() UpdateMachineDto: UpdateMachineDto,
  ): Promise<MachineDriver> {
    return this.MachineService.updateMachine(+id, UpdateMachineDto);
  }
}
