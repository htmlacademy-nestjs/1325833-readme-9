import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginUserDto } from '@project/core';
import { LoginRdo } from '../../rdo';

export const LoginSwaggerDecorator = () =>
  applyDecorators(
    ApiBody({ type: LoginUserDto }),
    ApiOperation({
      summary: 'Login to account',
      description: 'Login to account with email and password',
    }),
    ApiResponse({
      type: LoginRdo,
      status: HttpStatus.OK,
      description: 'Login successful',
    }),
    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: 'Incorrect email or password',
    })
  );
