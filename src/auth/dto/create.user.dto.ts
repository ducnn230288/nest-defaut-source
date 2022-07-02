import { IsEmail, Length } from 'class-validator';

export class CreateUserDto {
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
  readonly email: string;
}
