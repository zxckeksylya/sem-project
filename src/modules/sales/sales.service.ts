import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sale } from './sales.model';
import { CreateSaleDto } from './dto/create-sale.dto';

@Injectable()
export class SalesService {
  constructor(@InjectModel(Sale) private saleRepository: typeof Sale) {}

  async create(dto: CreateSaleDto) {
    const sale = await this.saleRepository.create(dto);
    return sale;
  }

  async getAllSales() {
    const sales = await this.saleRepository.findAll();
    return sales;
  }

  async getSaleById(id: number) {
    const sale = await this.saleRepository.findOne({ where: { id } });
    return sale;
  }

  async getSalesByEmployeeId(employeeId: number) {
    const sales = await this.saleRepository.findAll({ where: { employeeId } });
    return sales;
  }

  async getSalesByOfficeId(officeId: number) {
    const sales = await this.saleRepository.findAll({ where: { officeId } });
    return sales;
  }

  async getSalesByProductId(productId: number) {
    const sales = await this.saleRepository.findAll({ where: { productId } });
    return sales;
  }

  async removeSaleById(id: number) {
    const sale = await this.saleRepository.findOne({ where: { id } });
    sale.destroy();
  }
}
