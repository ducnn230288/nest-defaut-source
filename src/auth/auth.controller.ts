import { Body, Get, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

import {
  Auth,
  AuthUser,
  DefaultResponsesDto,
  Headers,
  MaxGroup,
  OnlyUpdateGroup,
  Public,
  RefreshTokenGuard,
  ResetPasswordTokenGuard,
  SerializerBody,
} from '@common';
import { User } from '@modules/user/user.entity';
import {
  DefaultAuthResponseDto,
  ForgottenPasswordAuthRequestDto,
  LoginAuthRequestDto,
  ProfileAuthRequestDto,
  ProfileAuthResponseDto,
  RegisterAuthRequestDto,
  RegisterAuthResponseDto,
  RestPasswordAuthRequestDto,
} from './dto';
import { AuthService, P_AUTH_DELETE_IMAGE_TEMP } from './auth.service';

import * as fs from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';

@Headers('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public({
    summary: 'Login',
    serializeOptions: { groups: [MaxGroup] },
  })
  @Post('login')
  async login(
    @I18n() i18n: I18nContext,
    @Body(new SerializerBody([MaxGroup, OnlyUpdateGroup])) loginAuthDto: LoginAuthRequestDto,
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
    summary: 'Forgotten password',
  })
  @Post('forgotten-password')
  async forgottenPassword(
    @I18n() i18n: I18nContext,
    @Body(new SerializerBody()) body: ForgottenPasswordAuthRequestDto,
  ): Promise<DefaultResponsesDto> {
    await this.authService.forgottenPassword(body);
    return {
      message: i18n.t('common.Success'),
    };
  }

  @Auth({
    summary: 'Reset password',
    serializeOptions: { groups: [OnlyUpdateGroup] },
    tokenGuard: ResetPasswordTokenGuard,
  })
  @Post('reset-password')
  async resetPassword(
    @I18n() i18n: I18nContext,
    @Body(new SerializerBody([OnlyUpdateGroup])) body: RestPasswordAuthRequestDto,
    @AuthUser() user: User,
  ): Promise<DefaultResponsesDto> {
    await this.authService.resetPassword(body, user);
    return {
      message: i18n.t('common.Success'),
    };
  }

  @Public({
    summary: 'Register',
    serializeOptions: { groups: [MaxGroup] },
  })
  @Post('register')
  async register(
    @I18n() i18n: I18nContext,
    @Body(new SerializerBody([MaxGroup, OnlyUpdateGroup])) createUserDto: RegisterAuthRequestDto,
  ): Promise<RegisterAuthResponseDto> {
    return {
      message: i18n.t('common.Success'),
      data: await this.authService.register(createUserDto),
    };
  }

  @Get('profile')
  @Auth({
    summary: 'My Profile',
    serializeOptions: { groups: [MaxGroup] },
  })
  async getProfile(@I18n() i18n: I18nContext, @AuthUser() user: User): Promise<ProfileAuthResponseDto> {
    return {
      message: i18n.t('common.Success'),
      data: user,
    };
  }

  @Put('profile')
  @Auth({
    summary: 'Update my Profile',
    serializeOptions: { groups: [MaxGroup] },
  })
  async updateProfile(
    @I18n() i18n: I18nContext,
    @AuthUser() user: User,
    @Body(new SerializerBody([MaxGroup, OnlyUpdateGroup])) updateData: ProfileAuthRequestDto,
  ): Promise<ProfileAuthResponseDto> {
    if (!updateData.password) {
      delete updateData.password;
    }
    await this.authService.update(user.id, updateData);
    return await this.getProfile(i18n, user);
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
    await this.authService.logout(user);
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
      storage: diskStorage({
        destination: (req, file, callback) => {
          const pathImage = './uploads';
          fs.mkdirSync(pathImage, { recursive: true });
          return callback(null, pathImage);
        },
        filename: (req, file, callback) => callback(null, `${uuid()}${extname(file.originalname)}`),
      }),
    }),
  )
  async uploadFile(@I18n() i18n: I18nContext, @UploadedFile() data: any) {
    // const data = await this.authService.uploadS3(file);
    // data.url = data.Location;
    data.url = process.env.DOMAIN + 'files/' + data.filename;
    return {
      message: i18n.t('common.Success'),
      data,
    };
  }

  @Post('check-delete-file')
  @Auth({
    summary: 'Check delete file',
    permission: P_AUTH_DELETE_IMAGE_TEMP,
  })
  async checkDeleteFile(@I18n() i18n: I18nContext): Promise<ProfileAuthResponseDto> {
    fs.readdir('./uploads', async (err, files) => {
      for (const file of files) {
        !(await this.authService.checkDeleteFile(file)) && fs.unlinkSync('./uploads/' + file);
      }
    });
    // const data = await this.authService.getListS3();
    // data.Contents.forEach(async (file) => await this.authService.checkDeleteFile(file.Key));
    return {
      message: i18n.t('common.Success'),
      data: null,
    };
  }
}
