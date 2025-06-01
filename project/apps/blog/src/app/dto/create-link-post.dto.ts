import { PostType } from '@project/core';
import { CreatePostDto } from './create-post.dto';
import { IsEnum, IsOptional, IsString, IsUrl, Length } from 'class-validator';

export class CreateLinkPostDto extends CreatePostDto {
  @IsOptional()
  @IsEnum(PostType)
  override type: PostType.LINK = PostType.LINK;

  @IsUrl()
  link: string;

  @IsOptional()
  @IsString()
  @Length(1, 300)
  description?: string;
}
