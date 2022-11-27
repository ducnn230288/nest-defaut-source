import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

import { DefaultResponsesDto, Example } from '../../../common';
import { User } from '../../../modules/user/user.entity';

export class DefaultAuthResponseDto extends PartialType(DefaultResponsesDto) {
  readonly data: DefaultAuthResponsesDataDto;
}

class DefaultAuthResponsesDataDto {
  user: DefaultAuthResponsesUserDto;

  @ApiProperty({ example: Example.token, description: '' })
  readonly accessToken: string;

  @ApiProperty({ example: Example.token, description: '' })
  readonly refreshToken: string;
}
class DefaultAuthResponsesUserDto extends PartialType(OmitType(User, ['password', 'roleId', 'role'] as const)) {}
