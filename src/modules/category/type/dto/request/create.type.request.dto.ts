import { PickType } from '@nestjs/swagger';
import { CategoryType } from '../../type.entity';

export class CreateCategoryTypeRequestDto extends PickType(CategoryType, ['name', 'code'] as const) {}
