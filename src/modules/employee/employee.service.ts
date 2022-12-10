import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Employee } from './employee.model';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee) private employeeRepository: typeof Employee,
    private roleService: RolesService,
  ) {}

  async createEmployee(dto: CreateEmployeeDto) {
    const employee = await this.employeeRepository.create(dto);
    const role = await this.roleService.getRoleByName('DIRECTOR');
    await employee.$set('roles', [role.id]);
    employee.roles = [role];
    return employee;
  }

  async getAllEmployees() {
    const employees = await this.employeeRepository.findAll({
      include: { all: true },
    });
    return employees;
  }

  async getEmployeeByLogin(login: string) {
    const employee = await this.employeeRepository.findOne({
      where: { login },
      include: { all: true },
    });
    return employee;
  }

  async addRole(dto: AddRoleDto) {
    const employee = await this.employeeRepository.findByPk(dto.employeeId);
    const role = await this.roleService.getRoleByName(dto.name);

    if (role && employee) {
      await employee.$add('role', role.id);
      return dto;
    }
    throw new HttpException('error', HttpStatus.NOT_FOUND);
  }
}
