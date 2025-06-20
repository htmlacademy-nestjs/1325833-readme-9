import { PublicUser } from '../../types';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GetUserRdo implements PublicUser {
  @Expose()
  @ApiProperty({
    example: '507f1f77bcf86cd799439011',
    description: 'User unique identifier',
  })
  id: string;

  @Expose()
  @ApiProperty({
    example: 0,
    description: 'User subscribers count',
  })
  subscribersCount: number;

  @Expose()
  @ApiProperty({
    example: 2,
    description: 'User posts count',
  })
  postsCount: number;

  @Expose()
  @ApiProperty({
    example: '2025-05-14T12:55:26.790Z',
    description: 'User registration date',
  })
  registrationDate: Date;
}
