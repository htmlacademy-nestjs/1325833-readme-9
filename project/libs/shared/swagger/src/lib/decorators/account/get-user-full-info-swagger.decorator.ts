import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { GetUserFullInfoRdo } from '@project/core';

export const GetUserFullInfoSwaggerDecorator = () =>
  applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Get user full info',
      description: 'Get full user info by ID',
    }),
    ApiParam({
      name: 'id',
      example: '507f1f77bcf86cd799439011',
      description: 'User unique identifier',
    }),
    ApiResponse({
      type: GetUserFullInfoRdo,
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
