import { PartialType } from '@nestjs/swagger';
import { PaginationResponsesDto } from '../../../common/dto/pagination.responses.dto';
import { Coffee } from '../entities/coffee.entity';

export class ListCoffeeResponsesDto extends PartialType(PaginationResponsesDto) {
  readonly data: Coffee[];
}
