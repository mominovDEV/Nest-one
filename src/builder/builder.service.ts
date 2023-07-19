import { Injectable } from '@nestjs/common/decorators';
import { InjectModel } from '@nestjs/sequelize';
import { CreateBuilderDto } from './dto/create-builder.dto';
import { Builder } from './models/builder.models';
// import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(@InjectModel(Builder) private builderRepo: typeof Builder) {}

  async createBuilder(CreateBuilderDto: CreateBuilderDto) {
    const company = await this.builderRepo.create(CreateBuilderDto);
    return company;
  }

  async getAllCompany(): Promise<Company[]> {
    const companies = await this.builderRepo.findAll();
    return companies;
  }
  async getByIdCompany(id: number): Promise<Company> {
    const companie = await this.builderRepo.findByPk(id);
    return companie;
  }
  async getCompanyByName(name: string): Promise<Company> {
    const companie = await this.builderRepo.findOne({ where: { name } });
    return companie;
  }

  async deleteCompanyByName(id: number): Promise<Number> {
    return this.builderRepo.destroy({ where: { id } });
  }
  async updateCompany(
    id: number,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    const companie = await this.builderRepo.update(updateCompanyDto, {
      where: { id },
      returning: true,
    });
    console.log(companie[1][0].dataValues);
    return companie[1][0].dataValues;
  }
}
