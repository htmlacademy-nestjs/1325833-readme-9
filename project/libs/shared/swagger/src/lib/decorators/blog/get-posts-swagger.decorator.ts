import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommonPostRdo } from '@project/core';

export const GetPostsSwaggerDecorator = () =>
  applyDecorators(
    ApiResponse({
      type: Array<CommonPostRdo>,
      status: HttpStatus.OK,
      description: 'Posts get successfully',
    }),
    ApiOperation({
      summary: 'Get posts',
      description: 'Get all published posts',
    })
  );
