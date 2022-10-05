import { ApiProperty, PickType } from '@nestjs/swagger';
import { Coffee } from '../../coffee.entity';
import { IsString } from 'class-validator';

export class UpdateCoffeeRequestDto extends PickType(Coffee, ['name', 'brand'] as const) {
  @ApiProperty({ example: [], description: '' })
  @IsString({ each: true })
  readonly flavors: string[];
}
