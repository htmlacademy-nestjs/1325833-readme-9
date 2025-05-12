import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

export const GetUserSwaggerDecorator = () =>
  applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Get user info',
      description: 'Get user info by ID',
    }),
    ApiParam({
      name: 'id',
      example: '507f1f77bcf86cd799439011',
      description: 'User unique identifier',
    }),
    ApiResponse({
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
