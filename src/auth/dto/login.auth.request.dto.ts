import { Length } from 'class-validator';

export class LoginAuthRequestDto {
  @Length(5)
  readonly username: string;
  @Length(8)
  readonly password: string;
}
