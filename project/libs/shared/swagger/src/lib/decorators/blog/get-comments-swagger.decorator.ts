import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { CommentPostRdo, GetCommentsDto } from '@project/core';

export const GetCommentsSwaggerDecorator = () =>
  applyDecorators(
    ApiBearerAuth(),
    ApiExtraModels(GetCommentsDto),
    ApiOperation({
      summary: `Get comments`,
      description: `Get comments for post`,
    }),
    ApiResponse({
      type: CommentPostRdo,
      isArray: true,
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
