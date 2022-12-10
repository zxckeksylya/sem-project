import { Module } from '@nestjs/common';
import { TownService } from './town.service';
import { TownController } from './town.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Town } from './town.model';
import { Office } from '../office/office.model';

@Module({
  providers: [TownService],
  controllers: [TownController],
  imports: [SequelizeModule.forFeature([Town, Office])],
})
export class TownModule {}
