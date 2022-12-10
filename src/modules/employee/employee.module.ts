import { forwardRef, Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Employee } from './employee.model';
import { Role } from '../roles/roles.model';
import { EmployeeRoles } from '../employee-roles/employee-role.model';
import { Office } from '../office/office.model';
import { RolesModule } from '../roles/roles.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService],
  imports: [
    SequelizeModule.forFeature([Employee, Role, EmployeeRoles, Office]),
    RolesModule,
    forwardRef(() => AuthModule),
  ],
  exports: [EmployeeService],
})
export class EmployeeModule {}
