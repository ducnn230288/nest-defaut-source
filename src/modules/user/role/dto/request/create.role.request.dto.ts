import { PickType } from '@nestjs/swagger';
import { UserRole } from '../../role.entity';

export class CreateUserRoleRequestDto extends PickType(UserRole, ['name', 'isSystemAdmin', 'permissions'] as const) {}
