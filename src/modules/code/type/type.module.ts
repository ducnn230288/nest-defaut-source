import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CodeType } from './type.entity';
import { CodeTypeController } from './type.controller';
import { CodeTypeService } from './type.service';

@Module({
  imports: [TypeOrmModule.forFeature([CodeType])],
  controllers: [CodeTypeController],
  providers: [CodeTypeService],
  exports: [CodeTypeService],
})
export class CodeTypeModule {}
