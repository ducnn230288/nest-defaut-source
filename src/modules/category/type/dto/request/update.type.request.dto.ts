import { PickType } from '@nestjs/swagger';
import { CategoryType } from '../../type.entity';

export class UpdateCategoryTypeRequestDto extends PickType(CategoryType, ['name'] as const) {}
