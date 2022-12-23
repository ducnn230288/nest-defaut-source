import { PickType } from '@nestjs/swagger';
import { CodeType } from '../../type.entity';

export class CreateCodeTypeRequestDto extends PickType(CodeType, ['name', 'code'] as const) {}
