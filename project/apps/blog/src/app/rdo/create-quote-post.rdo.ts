import { CreatePostRdo } from './create-post.rdo';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PostType } from '@project/core';

export class CreateQuotePostRdo extends CreatePostRdo {
  @Expose()
  @ApiProperty({
    example: PostType.QUOTE,
    description: 'Post type',
    default: PostType.QUOTE,
  })
  type: PostType.QUOTE;

  @ApiProperty({
    example: 'Reason is powerless before the cry of the heart',
    description: 'Quote text',
    minLength: 20,
    maxLength: 300,
  })
  quoteText: string;

  @ApiProperty({
    example: 'Kendrick Lamar',
    description: 'Author of quote',
    minLength: 3,
    maxLength: 50,
  })
  quoteAuthor: string;
}
