import { PickType } from '@nestjs/swagger';
import { Page } from '../../page.entity';
import { IsArray } from 'class-validator';

export class AllPageRequestDto {
  @IsArray()
  values: ItemPageRequestDto[];
}
export class ItemPageRequestDto extends PickType(Page, ['id', 'parentId', 'order'] as const) {
  @IsArray()
  parents: string[];

  @IsArray()
  children: ItemPageRequestDto[];
}
