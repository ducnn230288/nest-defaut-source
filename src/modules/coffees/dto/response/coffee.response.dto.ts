import { PartialType } from '@nestjs/swagger';
import { Coffee } from '../../coffee.entity';
import { DefaultResponsesDto } from '../../../../common/dto/default.responses.dto';

export class CoffeeResponseDto extends PartialType(DefaultResponsesDto) {
  readonly data: Coffee;
}
