import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { CurrentUserInterface } from '../types';

export const CurrentUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext): CurrentUserInterface => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  }
);
