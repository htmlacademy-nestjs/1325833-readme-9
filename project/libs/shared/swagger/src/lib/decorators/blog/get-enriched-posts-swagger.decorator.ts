import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiExtraModels, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EnrichedPostRdo, GetPostsDto } from '@project/core';

export const GetEnrichedPostsSwaggerDecorator = () =>
  applyDecorators(
    ApiExtraModels(GetPostsDto),
    ApiResponse({
      type: EnrichedPostRdo,
      isArray: true,
      status: HttpStatus.OK,
      description: 'Posts get successfully',
    }),
    ApiOperation({
      summary: 'Get posts',
      description: 'Get all published posts',
    })
  );
