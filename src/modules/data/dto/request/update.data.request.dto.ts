import { PartialType } from '@nestjs/swagger';
import { CreateDataRequestDto } from './create.data.request.dto';

export class UpdateDataRequestDto extends PartialType(CreateDataRequestDto) {}
