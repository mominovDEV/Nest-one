import { ApiOperation, ApiTags } from '@nestjs/swagger/dist/decorators';
import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './models/company.models';
@ApiTags('Company')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}
  @ApiOperation({ summary: 'Company yaratish' })
  @Post('create')
  async createCompany(@Body() CreateCompanyDto: CreateCompanyDto) {
    return this.companyService.createCompany(CreateCompanyDto);
    // return company;
  }
  @Get('all')
  async getAllCompany(): Promise<Company[]> {
    return this.companyService.getAllCompany();
  }

  @Get(':id')
  async getByIdCompany(@Param('id') id: string): Promise<Company> {
    return this.companyService.getByIdCompany(Number(id));
  }

  @Get(':name')
  async getCompanyByName(@Param('name') name: string): Promise<Company> {
    return this.companyService.getByIdCompany(Number(name));
  }

  @Delete(':id')
  async DeleteCompanyById(@Param('id') id: number): Promise<Company> {
    return this.companyService.getByIdCompany(Number(id));
  }
  @Put(':id')
  async updateCompany(
    @Param('id') id: number,
    @Body() UpdateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    return this.companyService.updateCompany(+id, UpdateCompanyDto);
  }
}
