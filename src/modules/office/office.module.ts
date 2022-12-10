import { Module } from '@nestjs/common';
import { OfficeService } from './office.service';
import { OfficeController } from './office.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Office } from './office.model';
import { Town } from '../town/town.model';

@Module({
  providers: [OfficeService],
  controllers: [OfficeController],
  imports: [SequelizeModule.forFeature([Office, Town])],
})
export class OfficeModule {}
