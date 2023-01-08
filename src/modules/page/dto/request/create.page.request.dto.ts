import { PickType } from '@nestjs/swagger';
import { Page } from '../../page.entity';

export class CreatePageRequestDto extends PickType(Page, ['name', 'style', 'translations'] as const) {}
