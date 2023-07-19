import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { BuilderService } from './builder.service';
import { CreateBuilderDto } from './dto/create-builder.dto';
import { UpdateBuilderDto } from './dto/update-builder.dto';
import { Builder } from './models/builder.models';

@Controller('builder')
export class BuilderController {
  constructor(private readonly builderService:BuilderService) {}

  @Post('create')
  async CreateBuilder(@Body() CreateBuilderDto: CreateBuilderDto) {
    return this.builderService.CreateBuilder(CreateBuilderDto);
  }
  @Get('all')
  async getAllBuilder(): Promise<Builder[]> {
    return this.builderService.getAllBuilder();
  }

  @Get(':id')
  async getByIdBuilder(@Param('id') id: string): Promise<Builder> {
    return this.builderService.getByIdBuilder(Number(id));
  }

  @Get(':full_name')
  async getBuilderByName(@Param('full_name') full_name: string): Promise<Builder> {
    return this.builderService.getBuilderByName(String(full_name));
  }

  @Delete(':id')
  async DeleteBuilderById(@Param('id') id: number): Promise<Number> {
    return this.builderService.DeleteBuilderById(Number(id));
  }
  @Put(':id')
  async updatebuilder(
    @Param('id') id: number,
    @Body() UpdateBuilderDto: UpdateBuilderDto,
  ): Promise<Builder> {
    return this.builderService.updateBuilder(+id, UpdateBuilderDto);
  }
}
