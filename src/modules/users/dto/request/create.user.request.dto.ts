import { Length } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { Example } from '../../../../constants';
import { User } from '../../user.entity';

export class CreateUserRequestDto extends PickType(User, [
  'username',
  'password',
  'firstName',
  'lastName',
  'email',
  'roleId',
] as const) {
  @Length(8)
  @ApiProperty({ example: Example.password, description: '' })
  readonly retypedPassword: string;
}
