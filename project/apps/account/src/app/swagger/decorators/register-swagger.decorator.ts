import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from '../../dto';

export const RegisterSwaggerDecorator = () =>
  applyDecorators(
    ApiBody({ type: CreateUserDto }),
    ApiOperation({
      summary: 'Register a new account',
      description: 'Create a new user account with email and password',
    }),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'User registered successfully',
    }),
    ApiResponse({
      status: HttpStatus.CONFLICT,
      description: 'User with this email exists',
    })
  );
