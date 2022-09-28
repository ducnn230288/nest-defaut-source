import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seeder } from './seeder';
import { RolesModule } from '../../modules/users/roles/roles.module';
import { UserModule } from '../../modules/users/user.module';
import { ConfigurationModule } from '../../configuration/configuration.module';
import { ConfigurationService } from '../../configuration/configuration.service';

/**
 * Import and provide seeder classes.
 *
 * @module
 */
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigurationModule],
      useFactory: (configService: ConfigurationService) => configService.postgresConfig,
      inject: [ConfigurationService],
    }),
    UserModule,
    RolesModule,
  ],
  providers: [Logger, Seeder],
})
export class SeederModule {}
