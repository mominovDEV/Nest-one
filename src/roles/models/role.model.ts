import { UserRoles } from './../../users/models/user-role.model';
import { Table, Model, Column, DataType, BelongsToMany } from 'sequelize-typescript';
import { User } from 'src/users/models/user.model';
interface RoleCreationAttrs{
    value:string;
    description:string;
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  value: string;
     
  @Column({
    type:DataType.STRING,
  })
  description: string;

  @BelongsToMany(()=>User,()=>UserRoles)
  users:User[];
}
