import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTownDto } from './dto/create-town.dto';
import { Town } from './town.model';

@Injectable()
export class TownService {
  constructor(@InjectModel(Town) private townRepository: typeof Town) {}

  async createTown(dto: CreateTownDto): Promise<Town> {
    const town = await this.townRepository.create(dto);
    return town;
  }

  async getAllTowns(): Promise<Town[]> {
    const towns = await this.townRepository.findAll();
    return towns;
  }

  async getTownById(id: number): Promise<Town> {
    const town = await this.townRepository.findOne({
      where: {
        id,
      },
    });
    return town;
  }

  async removeTownById(id: number): Promise<void> {
    const town = await this.townRepository.findOne({
      where: {
        id,
      },
    });
    town.destroy();
  }
}
