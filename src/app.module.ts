import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Builder } from './builder/models/builder.models';
import { CompanyModule } from './company/company.module';
import { MachineModule } from './machine/machine.module';
import { Machine } from './machine/models/machine.models';
import { Role } from './roles/models/role.model';
import { RolesModule } from './roles/roles.module';
import { UserRoles } from './users/models/user-role.model';
import { User } from './users/models/user.model';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [User, Role, UserRoles],
      autoLoadModels: true,
      logging: false,
    }),
    // CompanyModule,
    RolesModule,
    UsersModule,
    AuthModule,
    // MachineModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
