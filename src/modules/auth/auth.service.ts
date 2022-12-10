import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginEmployeeDto } from '../employee/dto/login-employee.dto';
import { EmployeeService } from '../employee/employee.service';
import * as bcrypt from 'bcryptjs';
import { CreateEmployeeDto } from '../employee/dto/create-employee.dto';

@Injectable()
export class AuthService {
  constructor(
    private employeesService: EmployeeService,
    private jwtService: JwtService,
  ) {}

  async login(employeeDto: LoginEmployeeDto) {
    const employee = await this.validateEmployee(employeeDto);
    return this.generateToken(employee);
  }

  async registration(employeeDto: CreateEmployeeDto) {
    const candidate = await this.employeesService.getEmployeeByLogin(
      employeeDto.login,
    );

    if (candidate) {
      throw new HttpException(
        'employee with this login exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(employeeDto.password, 5);
    const employee = await this.employeesService.createEmployee({
      ...employeeDto,
      password: hashPassword,
    });
    return this.generateToken(employee);
  }

  private async generateToken(employee) {
    const payload = {
      login: employee.login,
      id: employee.id,
      roles: employee.roles,
      office: employee.office,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateEmployee(employeeDto: LoginEmployeeDto) {
    const employee = await this.employeesService.getEmployeeByLogin(
      employeeDto.login,
    );
    const passwordEquals = await bcrypt.compare(
      employeeDto.password,
      employee.password,
    );
    if (employee && passwordEquals) {
      return employee;
    }
    throw new UnauthorizedException({ message: 'Uncorrect email or password' });
  }
}
