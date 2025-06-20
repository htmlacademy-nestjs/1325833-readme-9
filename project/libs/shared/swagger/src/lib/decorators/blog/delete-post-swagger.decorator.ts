import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommonPostRdo } from '@project/core';

export const DeletePostSwaggerDecorator = () =>
  applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: `Delete post`,
      description: `Delete post`,
    }),
    ApiResponse({
      type: CommonPostRdo,
      status: HttpStatus.OK,
      description: 'Post deleted successfully',
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
