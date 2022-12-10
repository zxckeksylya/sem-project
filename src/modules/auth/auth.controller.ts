import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginEmployeeDto } from '../employee/dto/login-employee.dto';
import { CreateEmployeeDto } from '../employee/dto/create-employee.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() employeeDto: LoginEmployeeDto) {
    return this.authService.login(employeeDto);
  }

  @Post('registration')
  registration(@Body() employeeDto: CreateEmployeeDto) {
    return this.authService.registration(employeeDto);
  }
}
