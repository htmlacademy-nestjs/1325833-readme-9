import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from '../../types';

export class SubscribeRdo implements BaseResponse {
  @Expose()
  @ApiProperty({
    example: false,
    description: 'Is subscribe successfully',
  })
  isSuccess: boolean;
}
