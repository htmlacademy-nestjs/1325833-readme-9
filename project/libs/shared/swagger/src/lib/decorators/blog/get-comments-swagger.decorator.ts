import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommentPostRdo } from '@project/core';

export const GetCommentsSwaggerDecorator = () =>
  applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: `Get comments`,
      description: `Get comments for post`,
    }),
    ApiResponse({
      type: Array<CommentPostRdo>,
      status: HttpStatus.OK,
      description: 'Comments get successfully',
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
