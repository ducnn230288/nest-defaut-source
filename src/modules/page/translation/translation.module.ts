import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PageTranslation } from './translation.entity';
// import { PageTranslationController } from './translation.controller';
import { PageTranslationService } from './translation.service';

@Module({
  imports: [TypeOrmModule.forFeature([PageTranslation])],
  // controllers: [PageTranslationController],
  providers: [PageTranslationService],
  exports: [PageTranslationService],
})
export class PageTranslationModule {}
