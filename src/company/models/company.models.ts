import { Table, Model, Column, DataType } from 'sequelize-typescript';

interface CompanyAttr {
  name: string;
  address: string;
  phone: string;
}

@Table({ tableName: 'company' })
export class Company extends Model<Company, CompanyAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(100),
  })
  name: string;
  @Column({
    type: DataType.STRING,
  })
  address: string;
  @Column({
    type: DataType.STRING,
  })
  phone: string;
  
}
