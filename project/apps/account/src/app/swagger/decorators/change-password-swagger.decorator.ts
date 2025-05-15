import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { ChangeUserPasswordDto } from '../../dto';
import { ChangePasswordRdo } from '../../rdo';

export const ChangePasswordSwaggerDecorator = () =>
  applyDecorators(
    ApiBearerAuth(),
    ApiBody({ type: ChangeUserPasswordDto }),
    ApiOperation({
      summary: 'Change password',
      description: 'Change user password',
    }),
    ApiResponse({
      type: ChangePasswordRdo,
      status: HttpStatus.OK,
      description: 'Password changed successfully',
    }),
    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: 'User not authorized or old password is incorrect',
    })
  );
