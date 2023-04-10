import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import { join, resolve } from 'path';

import { AuthModule } from '@auth/auth.module';
import { CodeTypeModule } from '@modules/code/type/type.module';
import { CodeModule } from '@modules/code/code.module';
import { UserRoleModule } from '@modules/user/role/role.module';
import { UserModule } from '@modules/user/user.module';
import { DataTypeModule } from '@modules/data/type/type.module';
import { DataModule } from '@modules/data/data.module';
import { PageModule } from '@modules/page/page.module';
import { PageTranslationModule } from '@modules/page/translation/translation.module';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ServeStaticModule.forRoot(
      (() => {
        const publicDir = resolve('./uploads/');
        const servePath = '/files';
        return {
          rootPath: publicDir,
          serveRoot: servePath,
          exclude: ['/api*'],
        };
      })(),
    ),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        autoLoadEntities: true,
        synchronize: process.env.NODE_ENV !== 'prod',
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: join(__dirname, '/translations/'),
        watch: process.env.NODE_ENV !== 'production',
      },
      resolvers: [{ use: QueryResolver, options: ['Accept-Language'] }, AcceptLanguageResolver],
    }),
    AuthModule,
    CodeTypeModule,
    CodeModule,
    UserRoleModule,
    UserModule,
    DataTypeModule,
    DataModule,
    PageModule,
    PageTranslationModule,
  ],
  controllers: [],
})
export class AppModule {}
