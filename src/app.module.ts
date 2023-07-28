import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Builder } from './builder/models/builder.models';
import { Machine } from './machine/models/machine.models';
import { Role } from './roles/models/role.model';
import { RolesModule } from './roles/roles.module';
import { UserRoles } from './users/models/user-role.model';
import { User } from './users/models/user.model';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { Company } from './company/models/company.models';
import { Driver } from './driver/models/driver.models';
import { MachineDriver } from './machine_driver/models/machine.models';
import { PostsModule } from './posts/posts.module';
import { Post } from './posts/models/post.model';
import { FilesModule } from './files/files.module';
import { FilesService } from './files/files.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [
        Role,
        User,
        UserRoles,
        Company,
        Machine,
        Builder,
        Driver,
        MachineDriver,
        Post,
      ],
      // models: [User, Role, UserRoles],
      autoLoadModels: true,
      logging: false,
    }),
    // CompanyModule,
    RolesModule,
    UsersModule,
    AuthModule,
    PostsModule,
    FilesModule,
    // MachineModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
