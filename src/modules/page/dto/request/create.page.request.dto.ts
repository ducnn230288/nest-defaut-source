import { PickType } from '@nestjs/swagger';
import { Page } from '../../page.entity';

export class CreatePageRequestDto extends PickType(Page, [
  'name',
  'slug',
  'style',
  'translations',
  'isHomePage',
] as const) {}
