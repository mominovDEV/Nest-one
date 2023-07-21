import { ApiProperty } from '@nestjs/swagger/dist';
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Role } from "src/roles/models/role.model";
import { UserRoles } from "./user-role.model";

interface UserCreationAttrs{
    name:string;
    email:string;
    password:string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({ example: 'user1', description: 'Foydalanuvchi nomi' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({ example: 'user1@gmail.com', description: 'Foydalanuvchi emaili' })
  @Column({
    type: DataType.STRING,
  })
  email: string;

  @Column({
    type: DataType.STRING,
  })
  password: string;
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;
  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];
}
