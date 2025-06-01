import { CreatePostDto } from './create-post.dto';
import { PostType } from '@project/core';
import { IsEnum, IsOptional, IsString, Length } from 'class-validator';

export class CreateQuotePostDto extends CreatePostDto {
  @IsOptional()
  @IsEnum(PostType)
  override type: PostType.QUOTE = PostType.QUOTE;

  @IsString()
  @Length(20, 300)
  quoteText: string;

  @IsString()
  @Length(3, 50)
  quoteAuthor: string;
}
