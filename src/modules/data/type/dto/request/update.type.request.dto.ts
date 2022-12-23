import { PickType } from '@nestjs/swagger';
import { DataType } from '../../type.entity';

export class UpdateDataTypeRequestDto extends PickType(DataType, ['name'] as const) {}
