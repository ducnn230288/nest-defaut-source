import { PartialType } from '@nestjs/swagger';
import { CreateUserRoleRequestDto } from './create.role.request.dto';

export class UpdateUserRoleRequestDto extends PartialType(CreateUserRoleRequestDto) {}
