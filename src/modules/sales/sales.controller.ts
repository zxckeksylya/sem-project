import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { SalesService } from './sales.service';

@Controller('sales')
export class SalesController {
  constructor(private salesService: SalesService) {}

  @Post()
  create(@Body() saleDto: CreateSaleDto) {
    return this.salesService.create(saleDto);
  }

  @Get()
  getAll() {
    return this.salesService.getAllSales();
  }

  @Get(':id')
  getSaleById(@Param('id') id: number) {
    return this.salesService.getSaleById(id);
  }

  @Get('product/:id')
  getSaleByProductId(@Param('id') id: number) {
    return this.salesService.getSalesByProductId(id);
  }

  @Get('employee/:id')
  getSaleByEmployeeId(@Param('id') id: number) {
    return this.salesService.getSalesByEmployeeId(id);
  }

  @Get('office/:id')
  getSaleByOfficeId(@Param('id') id: number) {
    return this.salesService.getSalesByOfficeId(id);
  }

  @Delete(':id')
  deleteSaleById(@Param('id') id: number) {
    return this.salesService.removeSaleById(id);
  }
}
