import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { SubscribeDto, SubscribeRdo } from '@project/core';

export const SubscribeSwaggerDecorator = () =>
  applyDecorators(
    ApiBearerAuth(),
    ApiBody({ type: SubscribeDto }),
    ApiOperation({
      summary: 'Subscribe to user',
      description: 'Subscribe to user',
    }),
    ApiResponse({
      type: SubscribeRdo,
      status: HttpStatus.OK,
      description: 'Subscribe successfully',
    }),
    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: 'User not authorized',
    })
  );
