import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Employee } from '../employee/employee.model';
import { Office } from '../office/office.model';
import { Product } from '../products/products.model';
import { SalesController } from './sales.controller';
import { Sale } from './sales.model';
import { SalesService } from './sales.service';

@Module({
  providers: [SalesService],
  controllers: [SalesController],
  imports: [SequelizeModule.forFeature([Sale, Product, Office, Employee])],
})
export class SalesModule {}
