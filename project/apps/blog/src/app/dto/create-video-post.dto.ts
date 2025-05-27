import { CreatePostDto } from './create-post.dto';
import { PostType } from '@project/core';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Matches,
} from 'class-validator';

export class CreateVideoPostDto extends CreatePostDto {
  @IsOptional()
  type: PostType.VIDEO = PostType.VIDEO;

  @IsNotEmpty()
  @IsString()
  @Length(20, 50)
  title: string;

  @IsNotEmpty()
  @IsUrl()
  @Matches(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/)
  videoUrl: string;
}
