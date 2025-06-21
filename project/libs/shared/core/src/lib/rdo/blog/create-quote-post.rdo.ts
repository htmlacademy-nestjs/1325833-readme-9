import { CreatePostRdo } from './create-post.rdo';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PostType } from '../../types';

export class CreateQuotePostRdo extends CreatePostRdo {
  @Expose()
  @ApiProperty({
    example: PostType.QUOTE,
    description: 'Post type',
    default: PostType.QUOTE,
  })
  type: PostType.QUOTE;

  @Expose()
  @ApiProperty({
    example: 'Reason is powerless before the cry of the heart',
    description: 'Quote text',
    minLength: 20,
    maxLength: 300,
  })
  quoteText: string;

  @Expose()
  @ApiProperty({
    example: 'Kendrick Lamar',
    description: 'Author of quote',
    minLength: 3,
    maxLength: 50,
  })
  quoteAuthor: string;
}
