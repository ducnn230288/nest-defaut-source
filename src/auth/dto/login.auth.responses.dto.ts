import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class LoginAuthResponsesDto {
  @ApiProperty({ example: 'Success' })
  readonly message: string;

  readonly data: User;
}
