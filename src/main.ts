import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
// import rateLimit from 'express-rate-limit';

import { AppModule } from './app.module';
import { setupSwagger } from './setup-swagger';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(), { cors: true });
  app.set('trust proxy', 1);
  app.use(helmet({ crossOriginResourcePolicy: false }));
  app.setGlobalPrefix('/api');
  // app.use(
  //   rateLimit({
  //     windowMs: 15 * 60 * 1000, // 115 minutes
  //     max: 100, // limit each IP to 100 requests per windowMs
  //   }),
  // );
  app.enableVersioning();
  app.useGlobalInterceptors(new ResponseInterceptor());

  if (process.env.NODE_ENV && process.env.NODE_ENV !== 'development') {
    app.enableShutdownHooks();
  }
  if (process.env.ENABLE_DOCUMENTATION) {
    setupSwagger(app);
  }
  await app.listen(process.env.PORT || 3000);
  const logger = new Logger('___DevLog___');
  logger.log(`Server running on ${await app.getUrl()}`);

  return app;
}
bootstrap();
