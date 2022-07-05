import { IsEmail, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';

export class RegisterUserDto {
  @Length(5)
  @ApiProperty({ example: faker.internet.userName().toLowerCase() })
  readonly username: string;

  @Length(8)
  readonly password: string;

  @Length(8)
  readonly retypedPassword: string;

  @Length(2)
  @ApiProperty({ example: faker.name.firstName() })
  readonly firstName: string;

  @Length(2)
  @ApiProperty({ example: faker.name.lastName() })
  readonly lastName: string;

  @IsEmail()
  @ApiProperty({ example: faker.internet.email().toLowerCase() })
  readonly email: string;
}
