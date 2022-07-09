import { Body, Controller, Get, Post, SerializeOptions } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User, GROUP_ALL_USERS, GROUP_USER } from './entities/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { LoginAuthRequestDto } from './dto/login.auth.request.dto';
import { RegisterAuthRequestDto } from './dto/register.auth.request.dto';
import { DefaultAuthResponsesDto } from './dto/default.auth.responses.dto';
import { RegisterAuthResponsesDto } from './dto/register.auth.responses.dto';
import { ProfileAuthResponsesDto } from './dto/profile.auth.responses.dto';
import { I18n, I18nContext } from 'nestjs-i18n';
import { Headers } from '../../common/headers';
import { Auth, AuthUser, Public } from '../../decorators';
import { Action } from '../../casl/userRoles';

@Controller('auth')
@ApiTags('auth')
@Headers()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @SerializeOptions({ groups: [GROUP_USER] })
  async login(@I18n() i18n: I18nContext, @Body() loginAuthDto: LoginAuthRequestDto): Promise<DefaultAuthResponsesDto> {
    const user = await this.authService.login(loginAuthDto);
    user['token'] = this.authService.getTokenForUser(user);
    return {
      message: i18n.t('common.Success'),
      data: user,
    };
  }

  @Public()
  @Post('register')
  @SerializeOptions({ groups: [GROUP_ALL_USERS] })
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
  @Auth(Action.Read, 'User')
  @SerializeOptions({ groups: [GROUP_USER] })
  async getProfile(@I18n() i18n: I18nContext, @AuthUser() user: User): Promise<ProfileAuthResponsesDto> {
    return {
      message: i18n.t('common.Success'),
      data: user,
    };
  }
}
