import { CreatePostRdo } from './create-post.rdo';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PostType } from '@project/core';

export class CreateTextPostRdo extends CreatePostRdo {
  @Expose()
  @ApiProperty({
    example: PostType.TEXT,
    description: 'Post type',
    default: PostType.TEXT,
  })
  type: PostType.TEXT;

  @Expose()
  @ApiProperty({
    example: 'Big post',
    description: 'Post title',
    minLength: 20,
    maxLength: 50,
  })
  title: string;

  @Expose()
  @ApiProperty({
    example: 'Post',
    description: 'Post preview',
    minLength: 50,
    maxLength: 255,
  })
  preview: string;

  @Expose()
  @ApiProperty({
    example:
      'This is a big post This is a big post This is a big post This is a big post This is a big post This is a big post This is a big post This is a big post This is a big post This is a big post This is a big post',
    description: 'Post content',
    minLength: 100,
    maxLength: 1024,
  })
  content: string;
}
