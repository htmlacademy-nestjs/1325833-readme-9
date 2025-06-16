import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommonPostRdo } from '../../rdo';

export const PublishPostSwaggerDecorator = () =>
  applyDecorators(
    ApiBearerAuth(),
    ApiResponse({
      type: CommonPostRdo,
      status: HttpStatus.OK,
      description: 'Post publish successfully',
    }),
    ApiOperation({
      summary: 'Publish post',
      description: 'Change post status to published',
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
