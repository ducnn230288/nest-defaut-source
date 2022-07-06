import { OmitType, PartialType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { DefaultResponsesDto } from '../../common/dto/default.responses.dto';

export class RegisterAuthResponsesDto extends PartialType(DefaultResponsesDto) {
  readonly data: RegisterAuthResponsesDataDto;
}

class RegisterAuthResponsesDataDto extends PartialType(OmitType(User, ['password', 'username', 'email'] as const)) {}
