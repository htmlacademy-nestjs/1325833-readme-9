import { PostType } from '@project/core';
import { CreatePostDto } from './create-post.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePhotoPostDto extends CreatePostDto {
  @IsOptional()
  type: PostType.PHOTO = PostType.PHOTO;

  @IsNotEmpty()
  @IsString()
  photoUrl: string;
}
