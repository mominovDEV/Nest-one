import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { DriverService } from './driver.service';
import { Driver } from './models/driver.models';

@Controller('Driver')
export class DriverController {
  constructor(private readonly DriverService: DriverService) {}

  @Post('create')
  async createDriver(@Body() CreateDriverDto: CreateDriverDto) {
    return this.DriverService.createDriver(CreateDriverDto);
    // return Driver;
  }
  @Get('all')
  async getAllDriver(): Promise<Driver[]> {
    return this.DriverService.getAllDriver();
  }

  @Get(':id')
  async getByIdDriver(@Param('id') id: string): Promise<Driver> {
    return this.DriverService.getByIdDriver(Number(id));
  }

  @Get(':name')
  async getDriverByName(@Param('name') name: string): Promise<Driver> {
    return this.DriverService.getByIdDriver(Number(name));
  }

  @Delete(':id')
  async DeleteDriverById(@Param('id') id: number): Promise<Driver> {
    return this.DriverService.getByIdDriver(Number(id));
  }
  @Put(':id')
  async updateDriver(
    @Param('id') id: number,
    @Body() UpdateDriverDto: UpdateDriverDto,
  ): Promise<Driver> {
    return this.DriverService.updateDriver(+id, UpdateDriverDto);
  }
}
