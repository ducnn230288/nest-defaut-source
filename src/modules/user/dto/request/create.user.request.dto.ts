import { MinLength } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';

import { Example } from '@common';
import { User } from '../../user.entity';

export class CreateUserRequestDto extends PickType(User, [
  'password',
  'name',
  'email',
  'phoneNumber',
  'dob',
  'startDate',
  'positionCode',
  'description',
  'avatar',
  'dateLeave',
  'roleId',
] as const) {
  @MinLength(6)
  @ApiProperty({ example: Example.password, description: '' })
  retypedPassword: string;
}
