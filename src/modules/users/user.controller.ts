import { Body, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User, GROUP_ALL_USERS, GROUP_USER } from './user.entity';
import { LoginUserRequestDto } from './dto/request/login.user.request.dto';
import { RegisterUserRequestDto } from './dto/request/register.user.request.dto';
import { DefaultAuthResponseDto } from './dto/response/default.auth.response.dto';
import { RegisterAuthResponseDto } from './dto/response/register.auth.response.dto';
import { ProfileAuthResponseDto } from './dto/response/profile.auth.response.dto';
import { I18n, I18nContext } from 'nestjs-i18n';
import { Auth, AuthUser, Public, Headers } from '../../decorators';
import { Action } from '../../casl/casl-ability.factory';
import { SerializerBody } from '../../common/pipe/serializer-body.pipe';

@Headers('user')
export class UserController {
  constructor(private readonly authService: UserService) {}

  @Public({
    summary: 'Login',
    serializeOptions: { groups: [GROUP_USER] },
  })
  @Post('login')
  async login(
    @I18n() i18n: I18nContext,
    @Body(new SerializerBody([GROUP_USER]))
    loginAuthDto: LoginUserRequestDto,
  ): Promise<DefaultAuthResponseDto> {
    const data = await this.authService.login(loginAuthDto);
    return {
      accessToken: this.authService.getTokenForUser(data),
      expiresIn: parseInt(process.env.JWT_EXPIRATION_TIME || '60'),
      message: i18n.t('common.Success'),
      data,
    };
  }

  @Public({
    summary: 'Register',
    serializeOptions: { groups: [GROUP_ALL_USERS] },
  })
  @Post('register')
  async register(
    @I18n() i18n: I18nContext,
    @Body(new SerializerBody([GROUP_USER])) createUserDto: RegisterUserRequestDto,
  ): Promise<RegisterAuthResponseDto> {
    return {
      message: i18n.t('common.Success'),
      data: await this.authService.register(createUserDto),
    };
  }

  @Get('profile')
  @Auth({
    roles: Action.Read,
    subjects: 'User',
    serializeOptions: { groups: [GROUP_USER] },
  })
  async getProfile(@I18n() i18n: I18nContext, @AuthUser() user: User): Promise<ProfileAuthResponseDto> {
    return {
      message: i18n.t('common.Success'),
      data: user,
    };
  }
}
