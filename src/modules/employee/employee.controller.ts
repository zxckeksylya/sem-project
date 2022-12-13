import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/roles-auth.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { Employee } from './employee.model';
import { EmployeeService } from './employee.service';

@ApiTags('employee')
@Controller('employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @ApiOperation({ summary: 'get employees' })
  @ApiResponse({ status: 200, type: [Employee] })
  @Roles('DIRECTOR')
  @UseGuards(RolesGuard)
  @Get()
  getAll() {
    return this.employeeService.getAllEmployees();
  }

  @ApiOperation({ summary: 'add role for employee' })
  @ApiResponse({ status: 200 })
  @Roles('DIRECTOR')
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() dto: AddRoleDto) {
    return this.employeeService.addRole(dto);
  }
}
