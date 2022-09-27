import { PickType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class LoginAuthRequestDto extends PickType(User, ['username', 'password'] as const) {}
