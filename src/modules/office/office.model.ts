import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Town } from '../town/town.model';

interface OfficeCreationAttrs {
  name: string;
  townId: number;
}

@Table({ tableName: 'offices' })
export class Office extends Model<Office, OfficeCreationAttrs> {
  @ApiProperty({ example: '1', description: 'unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Office', description: 'name of office' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ForeignKey(() => Town)
  @Column({ type: DataType.INTEGER })
  townId: number;
}
