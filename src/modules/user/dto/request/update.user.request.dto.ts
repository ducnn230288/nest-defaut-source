import { PickType } from '@nestjs/swagger';
import { User } from '../../user.entity';

export class UpdateUserRequestDto extends PickType(User, [
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
] as const) {}
