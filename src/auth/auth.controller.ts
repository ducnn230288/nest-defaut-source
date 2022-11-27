import { Body, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

import { Auth, AuthUser, Public, Headers, SerializerBody } from '../common';
import {
  LoginAuthRequestDto,
  RegisterAuthRequestDto,
  DefaultAuthResponseDto,
  RegisterAuthResponseDto,
  ProfileAuthResponseDto,
} from './dto';
import { AuthService } from './auth.service';

import { User, GROUP_USER } from '../modules/user/user.entity';
import { RefreshTokenGuard } from '../common/guards/refresh-token.guard';
import { GROUP_ALL_USER_ROLE } from '../modules/user/role/role.entity';

@Headers('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public({
    summary: 'Login',
    serializeOptions: { groups: [GROUP_USER, GROUP_ALL_USER_ROLE] },
  })
  @Post('login')
  async login(
    @I18n() i18n: I18nContext,
    @Body(new SerializerBody([GROUP_USER]))
    loginAuthDto: LoginAuthRequestDto,
  ): Promise<DefaultAuthResponseDto> {
    const user = await this.authService.login(loginAuthDto);
    const tokens = await this.authService.getTokens(user);
    return {
      message: i18n.t('common.Success'),
      data: {
        user,
        ...tokens,
      },
    };
  }

  @Public({
    summary: 'Register',
    serializeOptions: { groups: [GROUP_USER] },
  })
  @Post('register')
  async register(
    @I18n() i18n: I18nContext,
    @Body(new SerializerBody([GROUP_USER])) createUserDto: RegisterAuthRequestDto,
  ): Promise<RegisterAuthResponseDto> {
    return {
      message: i18n.t('common.Success'),
      data: await this.authService.register(createUserDto),
    };
  }

  @Get('profile')
  @Auth({
    summary: 'My Profile',
    serializeOptions: { groups: [GROUP_USER, GROUP_ALL_USER_ROLE] },
  })
  async getProfile(@I18n() i18n: I18nContext, @AuthUser() user: User): Promise<ProfileAuthResponseDto> {
    return {
      message: i18n.t('common.Success'),
      data: user,
    };
  }

  @Get('refresh')
  @Auth({
    summary: 'Refresh Token',
    tokenGuard: RefreshTokenGuard,
  })
  async refreshTokens(@I18n() i18n: I18nContext, @AuthUser() user: User): Promise<ProfileAuthResponseDto> {
    return {
      message: i18n.t('common.Success'),
      data: await this.authService.getTokens(user, false),
    };
  }

  @Get('logout')
  @Auth({
    summary: 'Logout',
  })
  async logout(@I18n() i18n: I18nContext, @AuthUser() user: User): Promise<ProfileAuthResponseDto> {
    this.authService.logout(user);
    return {
      message: i18n.t('common.Success'),
      data: null,
    };
  }

  @Post('upload')
  @Auth({
    summary: 'Upload',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      // import * as fs from 'fs';
      // import { diskStorage } from 'multer';
      // import { extname } from 'path';
      // import { v4 as uuid } from 'uuid';
      // storage: diskStorage({
      //   destination: (req, file, callback) => {
      //     const pathImage = './uploads';
      //     fs.mkdirSync(pathImage, { recursive: true });
      //     return callback(null, pathImage);
      //   },
      //   filename: (req, file, callback) => callback(null, `${uuid()}${extname(file.originalname)}`),
      // }),
    }),
  )
  async uploadFile(@I18n() i18n: I18nContext, @UploadedFile() file: any) {
    const data = await this.authService.uploadS3(file);
    // data.destination = data.Location;
    data.url = data.Location;
    return {
      message: i18n.t('common.Success'),
      data,
    };
  }

  @Post('check-delete-file')
  @Auth({
    summary: 'Check delete file',
  })
  async checkDeleteFile(@I18n() i18n: I18nContext): Promise<ProfileAuthResponseDto> {
    // fs.readdir('./uploads', async (err, files) => {
    //   files.forEach(
    //     async (file) => !(await this.authService.checkDeleteFile(file)) && fs.unlinkSync('./uploads/' + file),
    //   );
    // });
    const data = await this.authService.getListS3();
    console.log(data.Contents);
    data.Contents.forEach(async (file) => await this.authService.checkDeleteFile(file.Key));
    return {
      message: i18n.t('common.Success'),
      data: null,
    };
  }
}
