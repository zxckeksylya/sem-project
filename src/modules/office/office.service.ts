import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOfficeDto } from './dto/create-office.dto';
import { Office } from './office.model';

@Injectable()
export class OfficeService {
  constructor(@InjectModel(Office) private officeRepository: typeof Office) {}

  async createOffice(dto: CreateOfficeDto) {
    const office = this.officeRepository.create(dto);
    return office;
  }

  async getAllOffices() {
    const offices = this.officeRepository.findAll();
    return offices;
  }

  async getOfficeById(id: number) {
    const office = this.officeRepository.findOne({ where: { id } });
    return office;
  }
}
