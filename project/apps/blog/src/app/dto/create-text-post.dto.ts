import { CreatePostDto } from './create-post.dto';
import { PostType } from '@project/core';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateTextPostDto extends CreatePostDto {
  @IsOptional()
  @IsEnum(PostType)
  override type: PostType.TEXT = PostType.TEXT;

  @IsString()
  @Length(20, 50)
  title: string;

  @IsString()
  @Length(50, 255)
  preview: string;

  @IsString()
  @Length(100, 1024)
  content: string;
}
