import { IsEmail, IsNotEmpty } from 'class-validator';

export class NewUserInput {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  username?: string;

  firstName?: string;

  lastName?: string;

  roleId?: string;
}
