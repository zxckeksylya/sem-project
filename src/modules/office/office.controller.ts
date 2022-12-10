import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateOfficeDto } from './dto/create-office.dto';
import { OfficeService } from './office.service';

@Controller('office')
export class OfficeController {
  constructor(private officeService: OfficeService) {}

  @Post()
  create(@Body() officeDto: CreateOfficeDto) {
    return this.officeService.createOffice(officeDto);
  }

  @Get()
  getAll() {
    return this.officeService.getAllOffices();
  }

  @Get(':id')
  getOfficeById(@Param('id') id: number) {
    return this.officeService.getOfficeById(id);
  }
}
