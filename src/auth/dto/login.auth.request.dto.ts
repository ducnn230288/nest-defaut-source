import { Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';

export class LoginAuthRequestDto {
  @Length(5)
  @ApiProperty({ example: faker.internet.userName().toLowerCase() })
  readonly username: string;

  @Length(8)
  readonly password: string;
}
