import { PickType } from '@nestjs/swagger';
import { Data } from '../../data.entity';

export class CreateDataRequestDto extends PickType(Data, [
  'type',
  'image',
  'order',
  'translations',
  'createdAt',
] as const) {}
