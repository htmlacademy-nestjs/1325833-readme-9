import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { RefreshTokenDto, RefreshRdo } from '@project/core';

export const RefreshSwaggerDecorator = () =>
  applyDecorators(
    ApiBearerAuth(),
    ApiBody({ type: RefreshTokenDto }),
    ApiOperation({
      summary: 'Refresh tokens',
      description: `Refresh user's tokens`,
    }),
    ApiResponse({
      type: RefreshRdo,
      status: HttpStatus.OK,
      description: 'Tokens refreshed successfully',
    }),
    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: 'User not authorized',
    })
  );
