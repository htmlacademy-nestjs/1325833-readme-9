import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommonPostRdo } from '@project/core';

export const SearchPostsSwaggerDecorator = () =>
  applyDecorators(
    ApiResponse({
      type: CommonPostRdo,
      isArray: true,
      status: HttpStatus.OK,
      description: 'Posts search successfully',
    }),
    ApiOperation({
      summary: 'Search posts',
      description: 'Search all published posts by query',
    })
  );
