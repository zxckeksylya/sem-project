import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Office } from '../office/office.model';

interface TownCreationAttrs {
  name: string;
}

@Table({ tableName: 'towns' })
export class Town extends Model<Town, TownCreationAttrs> {
  @ApiProperty({ example: '1', description: 'unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({ example: 'Vitebsk', description: 'name of town' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @HasMany(() => Office)
  offices: Office[];
}
