import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { CommentPostRdo, CommentPostDto } from '@project/core';

export const CommentPostSwaggerDecorator = () =>
  applyDecorators(
    ApiBearerAuth(),
    ApiBody({ type: CommentPostDto }),
    ApiOperation({
      summary: `Create comment`,
      description: `Create comment for post`,
    }),
    ApiResponse({
      type: CommentPostRdo,
      status: HttpStatus.CREATED,
      description: 'Comment created successfully',
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
