import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CommentPostRdo {
  @Expose()
  @ApiProperty({
    example: 'e3800cfe-d4a5-4b74-acbb-23b8aac3798b',
    description: 'Comment id',
  })
  id: string;

  @Expose()
  @ApiProperty({
    example: 'This is comment text',
    description: 'Comment text',
  })
  text: string;

  @Expose()
  @ApiProperty({
    example: '2025-06-20T21:09:35.413Z',
    description: 'Post created date',
  })
  createdAt: Date;

  @Expose()
  @ApiProperty({
    example: '2025-06-20T21:09:35.413Z',
    description: 'Post updated date',
  })
  updatedAt: Date;

  @Expose()
  @ApiProperty({
    example: 'e3800cfe-d4a5-4b74-acbb-23b8aac3798b',
    description: 'Post id',
  })
  postId: string;

  @Expose()
  @ApiProperty({
    example: 'e3800cfe-d4a5-4b74-acbb-23b8aac3798b',
    description: 'Comment author id',
  })
  authorId: string;
}
