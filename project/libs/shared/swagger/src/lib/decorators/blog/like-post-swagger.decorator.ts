import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LikePostRdo } from '@project/core';

export const LikePostSwaggerDecorator = () =>
  applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: `Like post`,
      description: `Like post`,
    }),
    ApiResponse({
      type: LikePostRdo,
      status: HttpStatus.OK,
      description: 'Post liked successfully',
    }),
    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: 'User not authorized',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'User or post not found',
    })
  );
