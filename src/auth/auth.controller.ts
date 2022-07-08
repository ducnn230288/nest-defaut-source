import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  SerializeOptions,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuardJwt } from '../common/guards/auth-guard.jwt';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { AuthService } from './auth.service';
import { User, GROUP_ALL_USERS, GROUP_USER } from './entities/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginAuthRequestDto } from './dto/login.auth.request.dto';
import { RegisterAuthRequestDto } from './dto/register.auth.request.dto';
import { DefaultAuthResponsesDto } from './dto/default.auth.responses.dto';
import { RegisterAuthResponsesDto } from './dto/register.auth.responses.dto';
import { ProfileAuthResponsesDto } from './dto/profile.auth.responses.dto';
import { I18n, I18nContext } from 'nestjs-i18n';
import { Headers } from '../common/headers';

@Controller('auth')
@ApiTags('auth')
@Headers()
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
  @UseGuards(AuthGuardJwt)
  @ApiBearerAuth()
  @SerializeOptions({ groups: [GROUP_USER] })
  async getProfile(@I18n() i18n: I18nContext, @CurrentUser() user: User): Promise<ProfileAuthResponsesDto> {
    return {
      message: i18n.t('common.Success'),
      data: user,
    };
  }
}
