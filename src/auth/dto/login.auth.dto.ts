import { Length } from 'class-validator';

export class LoginAuthDto {
  @Length(5)
  readonly username: string;
  @Length(8)
  readonly password: string;
}
