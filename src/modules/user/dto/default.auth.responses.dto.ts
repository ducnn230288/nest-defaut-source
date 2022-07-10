import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { DefaultResponsesDto } from '../../../common/dto/default.responses.dto';
import { Example } from '../../../constants';

export class DefaultAuthResponsesDto extends PartialType(DefaultResponsesDto) {
  readonly data: DefaultAuthResponsesDataDto;
  @ApiProperty({ example: Example.token, description: '' })
  readonly accessToken: string;

  @ApiProperty({ example: '3600', description: '' })
  readonly expiresIn: number;
}

class DefaultAuthResponsesDataDto extends PartialType(OmitType(User, ['password'] as const)) {}
