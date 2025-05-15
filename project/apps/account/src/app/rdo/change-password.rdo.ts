import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from '@project/core';

export class ChangePasswordRdo implements BaseResponse {
  @Expose()
  @ApiProperty({
    example: false,
    description: 'Is change password successfully',
  })
  isSuccess: boolean;
}
