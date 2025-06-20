import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RefreshRdo } from '@project/core';

export const LogoutSwaggerDecorator = () =>
  applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Logout',
      description: `User logout`,
    }),
    ApiResponse({
      type: RefreshRdo,
      status: HttpStatus.OK,
      description: 'User logout successfully',
    }),
    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: 'User not authorized',
    })
  );
