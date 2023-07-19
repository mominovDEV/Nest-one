import { Module } from '@nestjs/common';
import { Builder } from './models/builder.models';
import { SequelizeModule } from '@nestjs/sequelize';
import { BuilderService } from './builder.service';
import { BuilderController } from './builder.controller';

@Module({
  imports: [SequelizeModule.forFeature([Builder])],
  controllers: [BuilderController],
  providers: [BuilderService],
})
export class BuilderModule {}
