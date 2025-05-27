import { CreatePostDto } from './create-post.dto';
import { PostType } from '@project/core';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateQuotePostDto extends CreatePostDto {
  type: PostType.QUOTE;

  @IsNotEmpty()
  @IsString()
  @Length(20, 300)
  quoteText: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  quoteAuthor: string;
}
