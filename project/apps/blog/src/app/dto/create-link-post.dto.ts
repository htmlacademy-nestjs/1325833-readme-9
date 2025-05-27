import { PostType } from '@project/core';
import { CreatePostDto } from './create-post.dto';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class CreateLinkPostDto extends CreatePostDto {
  type: PostType.LINK;

  @IsNotEmpty()
  @IsUrl()
  link: string;

  @IsOptional()
  @IsString()
  @Length(1, 300)
  description?: string;
}
