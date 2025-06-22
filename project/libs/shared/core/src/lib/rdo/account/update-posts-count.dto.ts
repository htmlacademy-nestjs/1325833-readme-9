import { ApiProperty } from '@nestjs/swagger';
import { UserPostsCountUpdateType } from '../../types';
import { IsEnum } from 'class-validator';

export class UpdatePostsCountDto {
  @IsEnum(UserPostsCountUpdateType)
  @ApiProperty({
    enum: UserPostsCountUpdateType,
    example: UserPostsCountUpdateType.DECREMENT,
    description: 'Update user posts count operation type',
  })
  operation: UserPostsCountUpdateType;
}
