import { applyDecorators } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';

export function Headers() {
  return applyDecorators(
    ApiHeader({
      name: 'Accept-Language',
      description: 'description',
    }),
  );
}