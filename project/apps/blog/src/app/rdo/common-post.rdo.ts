import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PostType, PostStatus } from '@project/core';

export class CommonPostRdo {
  @Expose()
  @ApiProperty({
    example: '713de965-bb46-427e-a511-0f0cec6efd4b',
    description: 'Post unique identifier',
  })
  id: string;

  @Expose()
  @ApiProperty({
    example: PostType.LINK,
    description: 'Post type',
    enum: PostType,
  })
  type: PostType;

  @Expose()
  @ApiProperty({
    example: PostStatus.PUBLISHED,
    description: 'Post status',
    enum: PostStatus,
  })
  status: PostStatus;

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
    example: '713de965-bb46-427e-a511-0f0cec6efd4b',
    description: 'Post author identifier',
  })
  authorId: string;

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
    example: ['IT', 'pop-punk'],
    description: 'Post tags',
    required: false,
  })
  tags?: string[];

  @Expose()
  @ApiProperty({
    example: 'It is a post title',
    description: 'Post title',
    minLength: 20,
    maxLength: 50,
    required: false,
  })
  title?: string;

  @Expose()
  @ApiProperty({
    example: 'Post',
    description: 'Post preview',
    minLength: 50,
    maxLength: 255,
    required: false,
  })
  preview?: string;

  @Expose()
  @ApiProperty({
    example: 'https://www.youtube.com/watch?v=2NplC4V1z0c',
    description: 'Post video url',
    required: false,
  })
  videoUrl?: string;

  @Expose()
  @ApiProperty({
    example:
      'This is a big post This is a big post This is a big post This is a big post This is a big post This is a big post This is a big post This is a big post This is a big post This is a big post This is a big post',
    description: 'Post content',
    minLength: 100,
    maxLength: 1024,
    required: false,
  })
  content?: string;

  @Expose()
  @ApiProperty({
    example: 'Reason is powerless before the cry of the heart',
    description: 'Quote text',
    minLength: 20,
    maxLength: 300,
    required: false,
  })
  quoteText?: string;

  @Expose()
  @ApiProperty({
    example: 'Kendrick Lamar',
    description: 'Author of quote',
    minLength: 3,
    maxLength: 50,
    required: false,
  })
  quoteAuthor?: string;

  @ApiProperty({
    example: 'https://example.com/photo',
    description: 'Photo url',
    required: false,
  })
  photoUrl?: string;

  @ApiProperty({
    example: 'https://example.com/link',
    description: 'Link',
    required: false,
  })
  link?: string;

  @Expose()
  @ApiProperty({
    example: 'This is just a link',
    description: 'The link description',
    minLength: 1,
    maxLength: 300,
    required: false,
  })
  description?: string;

  @Expose()
  @ApiProperty({
    example: '713de965-bb46-427e-a511-0f0cec6efd4b',
    description: 'Original post unique author identifier',
    required: false,
  })
  originalPostAuthorId?: string;

  @Expose()
  @ApiProperty({
    example: '713de965-bb46-427e-a511-0f0cec6efd4b',
    description: 'Original post unique identifier',
    required: false,
  })
  originalPostId?: string;
}
