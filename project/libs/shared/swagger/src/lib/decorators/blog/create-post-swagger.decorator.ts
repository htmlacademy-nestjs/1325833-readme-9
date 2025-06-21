import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { CreatePostDto, PostType } from '@project/core';

export const CreatePostSwaggerDecorator = (postType: PostType, rdo: any) =>
  applyDecorators(
    ApiBearerAuth(),
    ApiBody({ type: CreatePostDto }),
    ApiOperation({
      summary: `Create ${postType} post`,
      description: `Create post with ${postType} type`,
    }),
    ApiResponse({
      type: rdo,
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
