import { PartialType } from '@nestjs/swagger';
import { CreateCoffeeRequestDto } from './create.coffee.request.dto';

export class UpdateCoffeeRequestDto extends PartialType(CreateCoffeeRequestDto) {}
