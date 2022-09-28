import { PickType } from '@nestjs/swagger';
import { Role } from '../../role.entity';

export class CreateRoleRequestDto extends PickType(Role, ['name', 'isSystemAdmin'] as const) {}
