import { PartialType } from '@nestjs/swagger';
import { Coffee } from '../entities/coffee.entity';
import { DefaultResponsesDto } from '../../../common/dto/default.responses.dto';

export class CoffeeResponsesDto extends PartialType(DefaultResponsesDto) {
  readonly data: Coffee;
}
