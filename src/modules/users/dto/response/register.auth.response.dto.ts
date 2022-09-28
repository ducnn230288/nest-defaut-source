import { OmitType, PartialType } from '@nestjs/swagger';
import { User } from '../../user.entity';
import { DefaultResponsesDto } from '../../../../common/dto/default.responses.dto';

export class RegisterAuthResponseDto extends PartialType(DefaultResponsesDto) {
  readonly data: RegisterAuthResponsesDataDto;
}

class RegisterAuthResponsesDataDto extends PartialType(OmitType(User, ['password', 'username', 'email'] as const)) {}
