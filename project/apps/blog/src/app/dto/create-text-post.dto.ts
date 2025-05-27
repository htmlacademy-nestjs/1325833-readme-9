import { CreatePostDto } from './create-post.dto';
import { PostType } from '@project/core';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateTextPostDto extends CreatePostDto {
  type: PostType;

  @IsNotEmpty()
  @IsString()
  @Length(20, 50)
  title: string;

  @IsNotEmpty()
  @IsString()
  @Length(50, 255)
  preview: string;

  @IsNotEmpty()
  @IsString()
  @Length(100, 1024)
  content: string;
}
