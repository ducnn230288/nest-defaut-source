import { PickType } from '@nestjs/swagger';
import { User } from '../../user.entity';

export class LoginUserRequestDto extends PickType(User, ['username', 'password'] as const) {}
