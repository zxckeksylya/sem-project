import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTownDto } from './dto/create-town.dto';
import { Town } from './town.model';
import { TownService } from './town.service';

@ApiTags('towns')
@Controller('towns')
export class TownController {
  constructor(private townService: TownService) {}

  @ApiOperation({ summary: 'add town' })
  @ApiResponse({ status: 200, type: Town })
  @Post()
  create(@Body() townDto: CreateTownDto) {
    return this.townService.createTown(townDto);
  }

  @ApiOperation({ summary: 'get all towns' })
  @ApiResponse({ status: 200, type: [Town] })
  @Get()
  getAll() {
    return this.townService.getAllTowns();
  }

  @ApiParam({ example: '1', description: 'town id', name: 'id' })
  @ApiOperation({ summary: 'get town by id' })
  @ApiResponse({ status: 200, type: Town })
  @Get(':id')
  getTownById(@Param('id') id: number) {
    return this.townService.getTownById(id);
  }

  @ApiParam({ example: '1', description: 'town id', name: 'id' })
  @ApiOperation({ summary: 'delete town by id' })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  deleteTownById(@Param('id') id: number) {
    return this.townService.removeTownById(id);
  }
}
