import { PartialType } from '@nestjs/swagger';
import { CreateCodeRequestDto } from './create.code.request.dto';

export class UpdateCodeRequestDto extends PartialType(CreateCodeRequestDto) {}
