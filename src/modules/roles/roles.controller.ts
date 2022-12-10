import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.model';
import { RolesService } from './roles.service';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @ApiOperation({ summary: 'create role' })
  @ApiResponse({ status: 200, type: Role })
  @Post()
  create(@Body() townDto: CreateRoleDto) {
    return this.roleService.createRole(townDto);
  }

  @ApiOperation({ summary: 'get all roles' })
  @ApiResponse({ status: 200, type: [Role] })
  @Get()
  getAll() {
    return this.roleService.getAllRoles();
  }

  @ApiParam({ example: '1', description: 'role id', name: 'id' })
  @ApiOperation({ summary: 'get role by id' })
  @ApiResponse({ status: 200, type: Role })
  @Get(':id')
  getRoleById(@Param('id') id: number) {
    return this.roleService.getRoleById(id);
  }

  @ApiParam({ example: '1', description: 'role id', name: 'id' })
  @ApiOperation({ summary: 'delete role by id' })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  deleteRoleById(@Param('id') id: number) {
    return this.roleService.removeRoleById(id);
  }
}
