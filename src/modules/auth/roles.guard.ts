import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ROLES_KEY } from './roles-auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );
      console.log(requiredRoles)
      if (!requiredRoles) {
        return true;
      }
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];
      console.log(token);

      if (bearer !== 'Bearer' || !token) {
        console.log('mem');
        throw new UnauthorizedException({ message: 'Unuthoride employee' });
      }

      const employee = this.jwtService.verify(token);
      req.employee = employee;
      console.log(employee)
      return employee.roles.some((role) => requiredRoles.includes(role.name));
    } catch (e) {
      throw new HttpException(e, HttpStatus.FORBIDDEN);
    }
  }
}