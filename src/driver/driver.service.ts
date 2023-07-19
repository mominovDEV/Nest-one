import { Injectable } from '@nestjs/common/decorators';
import { InjectModel } from '@nestjs/sequelize';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';

import { Driver } from './models/driver.models';

@Injectable()
export class DriverService {
  constructor(@InjectModel(Driver) private DriverRepo: typeof Driver) {}

  async createDriver(CreateDriverDto: CreateDriverDto) {
    const Driver = await this.DriverRepo.create(CreateDriverDto);
    return Driver;
  }

  async getAllDriver(): Promise<Driver[]> {
    const Drivers = await this.DriverRepo.findAll();
    return Drivers;
  }
  async getByIdDriver(id: number): Promise<Driver> {
    const Driver = await this.DriverRepo.findByPk(id);
    return Driver;
  }
  // async getDriverByName(name: string): Promise<Driver> {
  //   const Driver = await this.DriverRepo.findOne({ where: { name } });
  //   return Driver;
  // }

  async deleteDriverByName(id: number): Promise<Number> {
    return this.DriverRepo.destroy({ where: { id } });
  }
  async updateDriver(
    id: number,
    updateDriverDto: UpdateDriverDto,
  ): Promise<Driver> {
    const Driver = await this.DriverRepo.update(updateDriverDto, {
      where: { id },
      returning: true,
    });
    console.log(Driver[1][0].dataValues);
    return Driver[1][0].dataValues;
  }
}
