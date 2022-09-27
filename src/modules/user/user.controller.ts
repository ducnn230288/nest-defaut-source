import { Body, Get, Post, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { User, GROUP_ALL_USERS, GROUP_USER } from './entities/user.entity';
import { LoginAuthRequestDto } from './dto/login.auth.request.dto';
import { RegisterAuthRequestDto } from './dto/register.auth.request.dto';
import { DefaultAuthResponsesDto } from './dto/default.auth.responses.dto';
import { RegisterAuthResponsesDto } from './dto/register.auth.responses.dto';
import { ProfileAuthResponsesDto } from './dto/profile.auth.responses.dto';
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
    loginAuthDto: LoginAuthRequestDto,
  ): Promise<DefaultAuthResponsesDto> {
    const user = await this.authService.login(loginAuthDto);
    return {
      accessToken: this.authService.getTokenForUser(user),
      expiresIn: parseInt(process.env.JWT_EXPIRATION_TIME || '60'),
      message: i18n.t('common.Success'),
      data: user,
    };
  }

  @Public({
    summary: 'Register',
    serializeOptions: { groups: [GROUP_ALL_USERS] },
  })
  @Post('register')
  async register(
    @I18n() i18n: I18nContext,
    @Body() createUserDto: RegisterAuthRequestDto,
  ): Promise<RegisterAuthResponsesDto> {
    const user = await this.authService.register(createUserDto);
    return {
      message: i18n.t('common.Success'),
      data: user,
    };
  }

  @Get('profile')
  @Auth({
    roles: Action.Read,
    subjects: 'User',
    serializeOptions: { groups: [GROUP_USER] },
  })
  async getProfile(@I18n() i18n: I18nContext, @AuthUser() user: User): Promise<ProfileAuthResponsesDto> {
    return {
      message: i18n.t('common.Success'),
      data: user,
    };
  }
}
