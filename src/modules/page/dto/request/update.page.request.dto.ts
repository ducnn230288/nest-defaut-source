import { PickType } from '@nestjs/swagger';
import { Page } from '../../page.entity';

export class UpdatePageRequestDto extends PickType(Page, ['name', 'slug', 'isHomePage', 'content'] as const) {}