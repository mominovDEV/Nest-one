import { Module } from '@nestjs/common';
import { MachineController } from './machine.controller';
import { MachineService } from './machine.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { MachineDriver } from './models/machine.models';

@Module({
  imports: [SequelizeModule.forFeature([MachineDriver])],
  controllers: [MachineController],
  providers: [MachineService],
})
export class MachineModule {}
