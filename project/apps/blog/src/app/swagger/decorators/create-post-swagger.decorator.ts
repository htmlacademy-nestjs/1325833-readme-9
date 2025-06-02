import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PostType } from '@project/core';

export const CreatePostSwaggerDecorator = (postType: PostType, rdo: any) =>
  applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: `Create ${postType} post`,
      description: `Create post with ${postType} type`,
    }),
    ApiResponse({
      type: rdo,
      status: HttpStatus.OK,
      description: 'User found successfully',
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
