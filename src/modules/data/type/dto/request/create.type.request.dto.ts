import { PickType } from '@nestjs/swagger';
import { DataType } from '../../type.entity';

export class CreateDataTypeRequestDto extends PickType(DataType, ['name', 'code'] as const) {}
