import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommonPostRdo } from '@project/core';

export const MyDraftsSwaggerDecorator = () =>
  applyDecorators(
    ApiBearerAuth(),
    ApiResponse({
      type: CommonPostRdo,
      isArray: true,
      status: HttpStatus.OK,
      description: 'Posts fetch successfully',
    }),
    ApiOperation({
      summary: 'Get my drafts',
      description: 'Get current user drafts',
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
