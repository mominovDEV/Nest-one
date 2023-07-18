import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Put,
} from '@nestjs/common';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

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

  @Delete(':name')
  async DeleteCompanyById(@Param('name') name: string): Promise<Company> {
    return this.companyService.getByIdCompany(Number(name));
  }
  @Put(':id')
  async updateCompany(
    @Param('id') id: number,
    @Body() UpdateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    return this.companyService.updateCompany(+id, UpdateCompanyDto);
  }
}
