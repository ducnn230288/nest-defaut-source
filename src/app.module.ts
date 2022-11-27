import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import { join } from 'path';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { UserRoleModule } from './modules/user/role/role.module';
import { CategoryModule } from './modules/category/category.module';
import { CategoryTypeModule } from './modules/category/type/type.module';
import { PageModule } from './modules/page/page.module';

@Module({
  imports: [
    // ServeStaticModule.forRoot( import { ServeStaticModule } from '@nestjs/serve-static';
    //   (() => {
    //     const publicDir = resolve('./uploads/');
    //     const servePath = '/files';
    //     return {
    //       rootPath: publicDir,
    //       serveRoot: servePath,
    //       exclude: ['/api*'],
    //     };
    //   })(),
    // ),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: join(__dirname, './translations/'),
        watch: process.env.NODE_ENV !== 'production',
      },
      resolvers: [{ use: QueryResolver, options: ['lang'] }, AcceptLanguageResolver],
    }),
    AuthModule,
    CategoryTypeModule,
    CategoryModule,
    PageModule,
    UserRoleModule,
    UserModule,
  ],
  controllers: [],
})
export class AppModule {}
