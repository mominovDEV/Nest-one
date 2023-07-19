import { Table, Model, Column, DataType,HasMany } from 'sequelize-typescript';
// import { Machine } from 'src/builder/models/builder.models';

interface MachineAttr {
  name: string;
  companyId: number;
}

@Table({ tableName: 'machine' })
export class Machine extends Model<Machine, MachineAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.INTEGER, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  companyId: number;

  // @HasMany(()=>Builder)
  // builders:Builder[];
}
