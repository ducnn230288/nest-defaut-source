import { OmitType, PartialType } from '@nestjs/swagger';

import { DefaultResponsesDto } from '@common';
import { User } from '@modules/user/user.entity';

export class RegisterAuthResponseDto extends PartialType(DefaultResponsesDto) {
  readonly data: RegisterAuthResponsesDataDto;
}

class RegisterAuthResponsesDataDto extends PartialType(
  OmitType(User, ['password', 'email', 'roleId', 'positionCode'] as const),
) {}
