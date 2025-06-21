import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from '../../types';

export class ChangePasswordRdo implements BaseResponse {
  @Expose()
  @ApiProperty({
    example: false,
    description: 'Is change password successfully',
  })
  isSuccess: boolean;
}
