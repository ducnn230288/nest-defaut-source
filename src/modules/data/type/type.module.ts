import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DataType } from './type.entity';
import { DataTypeController } from './type.controller';
import { DataTypeService } from './type.service';

@Module({
  imports: [TypeOrmModule.forFeature([DataType])],
  controllers: [DataTypeController],
  providers: [DataTypeService],
  exports: [DataTypeService],
})
export class DataTypeModule {}
