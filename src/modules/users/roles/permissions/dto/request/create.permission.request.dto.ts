import { PickType } from '@nestjs/swagger';
import { Permission } from '../../permission.entity';

export class CreatePermissionRequestDto extends PickType(Permission, [
  'resourceName',
  'creatorOnly',
  'canCreate',
  'canRead',
  'canUpdate',
  'canDelete',
  'roleId',
] as const) {}
