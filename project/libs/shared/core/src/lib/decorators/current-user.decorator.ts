import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { CurrentUserInterface } from '../types';

export const CurrentUser = createParamDecorator(
  (_, ctx: ExecutionContext): CurrentUserInterface => {
    const request = ctx.switchToHttp().getRequest();

    return request.user;
  }
);
