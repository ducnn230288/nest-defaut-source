import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

import { Example } from '@common';
import { User } from '@modules/user/user.entity';
import { DefaultAuthResponseDto } from './response/default.auth.response.dto';
import { RegisterAuthResponseDto } from './response/register.auth.response.dto';
import { ProfileAuthResponseDto } from './response/profile.auth.response.dto';

class LoginAuthRequestDto extends PickType(User, ['email', 'password'] as const) {}
class RegisterAuthRequestDto extends PickType(User, [
  'name',
  'password',
  'email',
  'phoneNumber',
  'dob',
  'description',
  'startDate',
] as const) {
  @MinLength(6)
  @ApiProperty({ example: Example.password, description: '' })
  readonly retypedPassword: string;
}
class ProfileAuthRequestDto extends PickType(User, [
  'name',
  'password',
  'email',
  'phoneNumber',
  'dob',
  'positionCode',
  'description',
  'avatar',
] as const) {
  @ApiProperty({ example: Example.password, description: '' })
  @IsString()
  @IsOptional()
  retypedPassword: string;
}
class ForgottenPasswordAuthRequestDto extends PickType(User, ['email'] as const) {}
class RestPasswordAuthRequestDto extends PickType(User, ['password'] as const) {
  @MinLength(6)
  @ApiProperty({ example: Example.password, description: '' })
  readonly retypedPassword: string;
}

export {
  LoginAuthRequestDto,
  RegisterAuthRequestDto,
  ProfileAuthRequestDto,
  ForgottenPasswordAuthRequestDto,
  RestPasswordAuthRequestDto,
  DefaultAuthResponseDto,
  RegisterAuthResponseDto,
  ProfileAuthResponseDto,
};
