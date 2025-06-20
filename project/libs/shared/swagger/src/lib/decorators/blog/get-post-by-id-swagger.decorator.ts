import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommonPostRdo } from '@project/core';

export const GetPostByIdSwaggerDecorator = () =>
  applyDecorators(
    ApiResponse({
      type: CommonPostRdo,
      status: HttpStatus.OK,
      description: 'Posts get successfully',
    }),
    ApiOperation({
      summary: 'Get post by id',
      description: 'Get post by id',
    })
  );
