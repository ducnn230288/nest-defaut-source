import { PickType } from '@nestjs/swagger';
import { CodeType } from '../../type.entity';

export class UpdateCodeTypeRequestDto extends PickType(CodeType, ['name'] as const) {}
