import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigurationModule } from './configuration/configuration.module';
import { ConfigurationService } from './configuration/configuration.service';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { setupSwagger } from './setup-swagger';
import { ResponseInterceptor } from './interceptors/response.interceptor';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(), { cors: true });
  app.set('trust proxy', 1);
  app.use(helmet());
  app.setGlobalPrefix('/api');
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );
  app.enableVersioning();
  app.useGlobalInterceptors(new ResponseInterceptor());

  const configService = app.select(ConfigurationModule).get(ConfigurationService);

  if (configService.documentationEnabled) {
    setupSwagger(app);
  }
  if (!configService.isDevelopment) {
    app.enableShutdownHooks();
  }
  await app.listen(configService.appConfig.port);
  console.info(`server running on ${await app.getUrl()}`);

  return app;
}
bootstrap();
