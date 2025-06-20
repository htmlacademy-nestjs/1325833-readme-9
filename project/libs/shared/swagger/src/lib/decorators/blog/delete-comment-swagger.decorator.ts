import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DeleteCommentRdo } from '@project/core';

export const DeleteCommentSwaggerDecorator = () =>
  applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: `Delete comment`,
      description: `Delete comment for post`,
    }),
    ApiResponse({
      type: DeleteCommentRdo,
      status: HttpStatus.CREATED,
      description: 'Comment deleted successfully',
    }),
    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: 'User not authorized',
    }),
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'User or post or comment not found',
    })
  );
