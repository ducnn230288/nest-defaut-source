import { IsEmail, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @Length(5)
  readonly username: string;
  @Length(8)
  readonly password: string;
  @Length(8)
  readonly retypedPassword: string;
  @Length(2)
  readonly firstName: string;
  @Length(2)
  readonly lastName: string;
  @IsEmail()
  @ApiProperty({ example: 'admin@admin.com' })
  readonly email: string;
}
