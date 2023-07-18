import { Injectable } from '@nestjs/common/decorators';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './models/company.models';

@Injectable()
export class CompanyService {
  constructor(@InjectModel(Company) private companyRepo: typeof Company) {}

  async createCompany(CreateCompanyDto: CreateCompanyDto) {
    const company = await this.companyRepo.create(CreateCompanyDto);
    return company;
  }

  async getAllCompany(): Promise<Company[]> {
    const companies = await this.companyRepo.findAll();
    return companies;
  }
  async getByIdCompany(id: number): Promise<Company> {
    const companie = await this.companyRepo.findByPk(id);
    return companie;
  }
  async getCompanyByName(name: string): Promise<Company> {
    const companie = await this.companyRepo.findOne({ where: { name } });
    return companie;
  }

  async deleteCompanyByName(id: number): Promise<Number> {
    return this.companyRepo.destroy({ where: { id } });
  }
  async updateCompany(
    id: number,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    const companie = await this.companyRepo.update(updateCompanyDto, {
      where: { id },
      returning: true,
    });
    console.log(companie[1][0].dataValues);
    return companie[1][0].dataValues;
  }
}
