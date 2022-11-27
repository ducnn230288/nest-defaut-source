import { MinLength } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';

import { Example } from '../../../common';
import { User } from '../../../modules/user/user.entity';

export class RegisterAuthRequestDto extends PickType(User, [
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
