import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LikePostRdo {
  @Expose()
  @ApiProperty({
    example: 'd0dfc3a9-fc2b-4e64-b2e9-fad117779e05',
    description: 'Like id',
  })
  id: string;

  @Expose()
  @ApiProperty({
    example: '2025-06-20T18:56:11.134Z',
    description: 'Created date',
  })
  createdAt: Date;

  @Expose()
  @ApiProperty({
    example: '2025-06-20T18:56:11.134Z',
    description: 'Updated date',
  })
  updatedAt: Date;

  @Expose()
  @ApiProperty({
    example: 'd0dfc3a9-fc2b-4e64-b2e9-fad117779e05',
    description: 'Post id',
  })
  postId: string;

  @Expose()
  @ApiProperty({
    example: 'd0dfc3a9-fc2b-4e64-b2e9-fad117779e05',
    description: 'User id',
  })
  userId: string;
}
