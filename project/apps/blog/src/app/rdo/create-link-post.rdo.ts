import { CreatePostRdo } from './create-post.rdo';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PostType } from '@project/core';

export class CreateLinkPostRdo extends CreatePostRdo {
  @Expose()
  @ApiProperty({
    example: PostType.LINK,
    description: 'Post type',
    default: PostType.LINK,
  })
  type: PostType.LINK;

  @ApiProperty({
    example: 'https://example.com/link',
    description: 'Link',
  })
  link: string;

  @ApiProperty({
    example: 'This is just a link',
    description: 'The link description',
    minLength: 1,
    maxLength: 300,
    required: false,
  })
  description?: string;
}
