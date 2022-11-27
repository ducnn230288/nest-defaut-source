import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryType } from './type.entity';
import { CategoryTypeController } from './type.controller';
import { CategoryTypeService } from './type.service';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryType])],
  controllers: [CategoryTypeController],
  providers: [CategoryTypeService],
  exports: [CategoryTypeService],
})
export class CategoryTypeModule {}
