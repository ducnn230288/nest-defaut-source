import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Data } from './data.entity';
import { DataController } from './data.controller';
import { DataService } from './data.service';
import { DataTranslation } from '@modules/data/translation/translation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Data, DataTranslation])],
  controllers: [DataController],
  providers: [DataService],
  exports: [DataService],
})
export class DataModule {}
