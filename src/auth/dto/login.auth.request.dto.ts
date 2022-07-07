import { Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import appConfig from '../../config/app.config';

export class LoginAuthRequestDto {
  @Length(5)
  @ApiProperty({ example: faker.internet.userName().toLowerCase(), description: '' })
  readonly username: string;

  @Length(8)
  @ApiProperty({ example: appConfig().example.password, description: '' })
  readonly password: string;
}
