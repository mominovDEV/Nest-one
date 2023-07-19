import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';

interface DriverAttr {
  first_name: string;
  last_name: string;
}

@Table({ tableName: 'Driver' })
export class Driver extends Model<Driver, DriverAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  first_name: string;
  @Column({
    type: DataType.STRING,
  })
  last_name: string;
}
