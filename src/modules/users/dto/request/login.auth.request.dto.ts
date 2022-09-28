import { PickType } from '@nestjs/swagger';
import { User } from '../../user.entity';

export class LoginAuthRequestDto extends PickType(User, ['username', 'password'] as const) {}
