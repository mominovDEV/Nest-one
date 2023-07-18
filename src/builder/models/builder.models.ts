import { Table, Model, Column, DataType } from 'sequelize-typescript';

interface BuilderAttr {
  full_name: string;
  birth_day: Date;
  salary: string;
  companyId:bigint;
}

@Table({ tableName: 'builder' })
export class Builder extends Model<Builder, BuilderAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(100),
  })
  full_name: string;
  @Column({
    type: DataType.STRING,
  })
  birth_day: Date;
  @Column({
    type: DataType.STRING,
  })
  salary: string;
  @Column({
    type: DataType.STRING,
  })
  companyId:bigint;
  
}
