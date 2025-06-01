import { CreatePostDto } from './create-post.dto';
import { PostType } from '@project/core';
import {
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Matches,
} from 'class-validator';

export class CreateVideoPostDto extends CreatePostDto {
  @IsOptional()
  @IsEnum(PostType)
  override type: PostType.VIDEO = PostType.VIDEO;

  @IsString()
  @Length(20, 50)
  title: string;

  @IsUrl()
  @Matches(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/)
  videoUrl: string;
}
