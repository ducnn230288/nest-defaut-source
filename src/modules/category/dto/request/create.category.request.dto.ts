import { PickType } from '@nestjs/swagger';
import { Category } from '../../category.entity';

export class CreateCategoryRequestDto extends PickType(Category, [
  'code',
  'type',
  'name',
  'subName',
  'image',
  'order',
  'description',
  'content',
  'attribute',
] as const) {}
