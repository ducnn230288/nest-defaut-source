import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
// import { APP_GUARD } from '@nestjs/core';
// import { ApiKeyGuard } from './guards/api-key.guard';
import { ConfigModule } from '@nestjs/config';
import { LoggingMiddleware } from './middleware/logging.middleware';
// , providers: [{ provide: APP_GUARD, useClass: ApiKeyGuard }]
@Module({ imports: [ConfigModule] })
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
