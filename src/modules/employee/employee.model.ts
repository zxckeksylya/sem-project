import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Office } from '../office/office.model';
import { Role } from '../roles/roles.model';
import { EmployeeRoles } from '../employee-roles/employee-role.model';

interface EmployeeCreationAttrs {
  login: string;
  password: string;
  officeId: number;
}

@Table({ tableName: 'employees' })
export class Employee extends Model<Employee, EmployeeCreationAttrs> {
  @ApiProperty({ example: '1', description: 'unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({ example: 'login', description: 'login of employee' })
  @Column({ type: DataType.STRING, allowNull: false })
  login: string;

  @ApiProperty({ example: 'password', description: 'password of employee' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @BelongsToMany(() => Role, () => EmployeeRoles)
  roles: Role[];

  @ForeignKey(() => Office)
  @Column({ type: DataType.INTEGER })
  officeId: number;
}
