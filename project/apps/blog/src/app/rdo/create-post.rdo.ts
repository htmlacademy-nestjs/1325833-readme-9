import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PostType, PostStatus } from '@project/core';

export abstract class CreatePostRdo {
  @Expose()
  @ApiProperty({
    example: '713de965-bb46-427e-a511-0f0cec6efd4b',
    description: 'Post unique identifier',
  })
  id: string;

  @Expose()
  @ApiProperty({
    example: PostStatus.DRAFT,
    description: 'Post status',
    default: PostStatus.DRAFT,
  })
  status: PostStatus.DRAFT;

  @Expose()
  @ApiProperty({
    example: ['IT', 'pop-punk'],
    description: 'Post tags',
    required: false,
  })
  tags?: string[];

  @Expose()
  @ApiProperty({
    example: '2025-06-02T15:32:24.748Z',
    description: 'Post create date',
  })
  createdAt: Date;

  @Expose()
  @ApiProperty({
    example: '2025-06-02T15:32:24.748Z',
    description: 'Post update date',
  })
  updatedAt: Date;

  @Expose()
  @ApiProperty({
    example: false,
    description: 'Is repost identifier in post',
  })
  isRepost: boolean;

  @Expose()
  @ApiProperty({
    example: 0,
    description: 'Post likes count',
  })
  likesCount: number;

  @Expose()
  @ApiProperty({
    example: 0,
    description: 'Post comments count',
  })
  commentsCount: number;

  @Expose()
  @ApiProperty({
    example: '713de965-bb46-427e-a511-0f0cec6efd4b',
    description: 'Post author identifier',
  })
  authorId: string;

  abstract type: PostType;
}
