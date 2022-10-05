import { PartialType } from '@nestjs/swagger';
import { PaginationResponsesDto } from '../../../../common/dto/pagination.responses.dto';
import { Coffee } from '../../coffee.entity';

export class ListCoffeeResponseDto extends PartialType(PaginationResponsesDto) {
  readonly data: Coffee[];
}
