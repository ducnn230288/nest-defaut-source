import { applyDecorators, SerializeOptions, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiForbiddenResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/auth.guard';
import { CheckPolicies, PoliciesGuard } from '../guards/PoliciesGuard';
import { AppAbility } from '../casl/casl-ability.factory';
import { Action } from 'src/casl/casl-ability.factory';
import { ClassTransformOptions } from '@nestjs/common/interfaces/external/class-transform-options.interface';

export function Auth(roles: Action, subjects: string, serializeOptions: ClassTransformOptions): MethodDecorator {
  return applyDecorators(
    SerializeOptions(serializeOptions),
    UseGuards(JwtAuthGuard, PoliciesGuard),
    CheckPolicies((ability: AppAbility) => ability?.can(roles, subjects)),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Error: Unauthorized' }),
    ApiForbiddenResponse({ description: 'Error: Forbidden' }),
  );
}
export const IS_PUBLIC_KEY = 'isPublic';
export function Public(serializeOptions: ClassTransformOptions): MethodDecorator {
  SetMetadata(IS_PUBLIC_KEY, true);
  return applyDecorators(SerializeOptions(serializeOptions));
}
