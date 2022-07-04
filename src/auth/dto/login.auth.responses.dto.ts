import { User } from '../entities/user.entity';

export class LoginAuthResponsesDto {
  message: string;
  data: User;
}
