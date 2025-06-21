import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UploadedFileRdo } from '@project/core';

export const UploadFileSwaggerDecorator = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Upload file',
      description: 'Upload file',
    }),
    ApiResponse({
      type: UploadedFileRdo,
      status: HttpStatus.CREATED,
      description: 'File upload successfully',
    })
  );
