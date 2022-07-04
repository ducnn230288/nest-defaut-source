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
import { RegisterUserDto } from './dto/register.user.dto';
import { LoginAuthResponsesDto } from './dto/login.auth.responses.dto';

@Controller('auth')
@ApiTags('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginAuthDto: LoginAuthRequestDto): Promise<LoginAuthResponsesDto> {
    const user = await this.authService.login(loginAuthDto);
    return {
      message: 'Login Success',
      data: user,
      // userId: user.id,
      // token: this.authService.getTokenForUser(user),
    };
  }

  @Post('register')
  @SerializeOptions({
    groups: [GROUP_ALL_USERS],
  })
  async register(@Body() createUserDto: RegisterUserDto): Promise<User> {
    return await this.authService.register(createUserDto);
    // return {
    //   ...(await this.userRepository.save(user)),
    //   token: this.authService.getTokenForUser(user),
    // };
  }

  @Get('profile')
  @UseGuards(AuthGuardJwt)
  @ApiBearerAuth()
  @SerializeOptions({
    groups: [GROUP_USER],
  })
  async getProfile(@CurrentUser() user: User): Promise<User> {
    return user;
  }
}
