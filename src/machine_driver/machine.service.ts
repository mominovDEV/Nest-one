import { Injectable } from '@nestjs/common/decorators';
import { InjectModel } from '@nestjs/sequelize';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';

import { MachineDriver } from './models/machine.models';

@Injectable()
export class MachineService {
  constructor(@InjectModel(MachineDriver) private machineRepo: typeof MachineDriver) {}

  async createMachine(CreateMachineDto: CreateMachineDto) {
    const Machine = await this.machineRepo.create(CreateMachineDto);
    return Machine;
  }

  async getAllMachine(): Promise<MachineDriver[]> {
    const machines = await this.machineRepo.findAll();
    return machines;
  }
  async getByIdMachine(id: number): Promise<MachineDriver> {
    const machine = await this.machineRepo.findByPk(id);
    return machine;
  }
  // async getMachineByName(name: string): Promise<Machine> {
  //   const machine = await this.machineRepo.findOne({ where: { name } });
  //   return machine;
  // }

  async deleteMachineByName(id: number): Promise<Number> {
    return this.machineRepo.destroy({ where: { id } });
  }
  async updateMachine(
    id: number,
    updateMachineDto: UpdateMachineDto,
  ): Promise<MachineDriver> {
    const machine = await this.machineRepo.update(updateMachineDto, {
      where: { id },
      returning: true,
    });
    console.log(machine[1][0].dataValues);
    return machine[1][0].dataValues;
  }
}
