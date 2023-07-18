import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Company } from './models/company.models';

@Module({
  imports: [SequelizeModule.forFeature([Company])],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
