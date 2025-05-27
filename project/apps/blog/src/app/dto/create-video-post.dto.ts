import { CreatePostDto } from './create-post.dto';
import { PostType } from '@project/core';
import { IsNotEmpty, IsString, IsUrl, Length, Matches } from 'class-validator';

export class CreateVideoPostDto extends CreatePostDto {
  type: PostType.VIDEO;

  @IsNotEmpty()
  @IsString()
  @Length(20, 50)
  title: string;

  @IsNotEmpty()
  @IsUrl()
  @Matches(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/)
  videoUrl: string;
}
