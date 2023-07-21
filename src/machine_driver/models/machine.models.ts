import { Table, Model, Column, DataType,HasMany, ForeignKey } from 'sequelize-typescript';
import { Driver } from 'src/driver/models/driver.models';
// import { Machine } from 'src/builder/models/builder.models';

interface MachineAttr {
  name: string;
  companyId: number;
}

@Table({ tableName: 'machine' })
export class MachineDriver extends Model<MachineDriver, MachineAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ForeignKey(() => MachineDriver)
  @Column({ type: DataType.INTEGER })
  machineId: number;

  @ForeignKey(() => Driver)
  @Column({ type: DataType.INTEGER })
  driverId: number;

  // @Column({ type: DataType.INTEGER, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  // companyId: number;

  // @HasMany(()=>Builder)
  // builders:Builder[];
}
