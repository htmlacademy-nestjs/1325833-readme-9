import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreatePostRdo } from '@project/core';

export const RepostPostSwaggerDecorator = () =>
  applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: `Repost post`,
      description: `Create a repost of a post`,
    }),
    ApiResponse({
      type: CreatePostRdo,
      status: HttpStatus.CREATED,
      description: 'Post created successfully',
    }),
    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: 'User not authorized',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'User not found',
    })
  );
