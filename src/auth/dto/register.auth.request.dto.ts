import { IsEmail, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import appConfig from '../../config/app.config';

export class RegisterAuthRequestDto {
  @Length(5)
  @ApiProperty({ example: faker.internet.userName().toLowerCase(), description: '' })
  readonly username: string;

  @Length(8)
  @ApiProperty({ example: appConfig().example.password, description: '' })
  readonly password: string;

  @Length(8)
  @ApiProperty({ example: appConfig().example.password, description: '' })
  readonly retypedPassword: string;

  @Length(2)
  @ApiProperty({ example: faker.name.firstName(), description: '' })
  readonly firstName: string;

  @Length(2)
  @ApiProperty({ example: faker.name.lastName(), description: '' })
  readonly lastName: string;

  @IsEmail()
  @ApiProperty({ example: faker.internet.email().toLowerCase(), description: '' })
  readonly email: string;
}
