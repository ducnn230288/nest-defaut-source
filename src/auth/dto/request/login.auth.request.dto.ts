import { PickType } from '@nestjs/swagger';

import { User } from '../../../modules/user/user.entity';

export class LoginAuthRequestDto extends PickType(User, ['email', 'password'] as const) {}
