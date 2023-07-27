import { RolesModule } from './../roles/roles.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRoles } from './models/user-role.model';
import { User } from './models/user.model';
import { Role } from '../roles/models/role.model';
import { AuthModule } from '../auth/auth.module';
import { Post } from '../posts/models/post.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Role, UserRoles]), RolesModule,AuthModule,Post],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
