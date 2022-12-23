import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Code } from './code.entity';
import { CodeController } from './code.controller';
import { CodeService } from './code.service';

@Module({
  imports: [TypeOrmModule.forFeature([Code])],
  controllers: [CodeController],
  providers: [CodeService],
  exports: [CodeService],
})
export class CodeModule {}
