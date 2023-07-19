import { Injectable } from '@nestjs/common/decorators';
import { InjectModel } from '@nestjs/sequelize';
import { CreateBuilderDto } from './dto/create-builder.dto';
import { UpdateBuilderDto } from './dto/update-builder.dto';
import { Builder } from './models/builder.models';
// import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class BuilderService {
  constructor(@InjectModel(Builder) private builderRepo: typeof Builder) {}

  async CreateBuilder(CreateBuilderDto: CreateBuilderDto) {
    const builder = await this.builderRepo.create(CreateBuilderDto);
    return builder;
  }

  async findAll():Promise<Builder[]>{
    return this.builderRepo.findAll({include:{all:true}})
  }

  async getAllBuilder(): Promise<Builder[]> {
    const builders = await this.builderRepo.findAll();
    return builders;
  }
  async getByIdBuilder(id: number): Promise<Builder> {
    const builder = await this.builderRepo.findByPk(id);
    return builder;
  }
  async getBuilderByName(full_name: string): Promise<Builder> {
    const builder = await this.builderRepo.findOne({ where: { full_name } });
    return builder;
  }

  async DeleteBuilderById(id: number): Promise<Number> {
    return this.builderRepo.destroy({ where: { id } });
  }
  async updateBuilder(
    id: number,
    updateBuilderDto: UpdateBuilderDto,
  ): Promise<Builder> {
    const builder = await this.builderRepo.update(updateBuilderDto, {
      where: { id },
      returning: true,
    });
    console.log(builder[1][0].dataValues);
    return builder[1][0].dataValues;
  }
}
