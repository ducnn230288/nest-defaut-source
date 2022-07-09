import { Global, Module } from '@nestjs/common';
import { CaslAbilityFactory } from './casl-ability.factory';
import { CaslService } from './casl.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity';
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [CaslAbilityFactory, CaslService],
  exports: [CaslAbilityFactory, CaslService],
})
export class CaslModule {}
