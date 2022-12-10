import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../products/products.model';
import { Office } from '../office/office.model';
import { Employee } from '../employee/employee.model';
import {
  Column,
  DataType,
  Table,
  Model,
  ForeignKey,
} from 'sequelize-typescript';
interface SalesCreationAttrs {
  productId: number;
  officeId: number;
  employeeId: number;
  countOfProduct: number;
  date: Date;
}

@Table({ tableName: 'sales' })
export class Sale extends Model<Sale, SalesCreationAttrs> {
  @ApiProperty({ example: '1', description: 'unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER })
  productId: number;

  @ForeignKey(() => Office)
  @Column({ type: DataType.INTEGER })
  officeId: number;

  @ForeignKey(() => Employee)
  @Column({ type: DataType.INTEGER })
  employeeId: number;

  @Column({ type: DataType.DATE })
  date: Date;
}
