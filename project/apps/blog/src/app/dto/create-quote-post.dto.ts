import { CreatePostDto } from './create-post.dto';
import { PostType } from '@project/core';
import { IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuotePostDto extends CreatePostDto {
  @IsOptional()
  @IsEnum(PostType)
  override type: PostType.QUOTE = PostType.QUOTE;

  @IsString()
  @Length(20, 300)
  @ApiProperty({
    example: 'Reason is powerless before the cry of the heart',
    description: 'Quote text',
    minLength: 20,
    maxLength: 300,
  })
  quoteText: string;

  @IsString()
  @Length(3, 50)
  @ApiProperty({
    example: 'Kendrick Lamar',
    description: 'Author of quote',
    minLength: 3,
    maxLength: 50,
  })
  quoteAuthor: string;
}
