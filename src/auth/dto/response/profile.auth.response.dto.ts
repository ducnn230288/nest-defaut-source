import { OmitType, PartialType } from '@nestjs/swagger';

import { DefaultResponsesDto } from '@common';
import { User } from '@modules/user/user.entity';

export class ProfileAuthResponseDto extends PartialType(DefaultResponsesDto) {
  readonly data: ProfileAuthResponsesDataDto;
}

class ProfileAuthResponsesDataDto extends PartialType(OmitType(User, ['password'] as const)) {}
