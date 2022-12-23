import { PickType } from '@nestjs/swagger';
import { Code } from '../../code.entity';

export class CreateCodeRequestDto extends PickType(Code, ['code', 'type', 'name', 'description'] as const) {}
