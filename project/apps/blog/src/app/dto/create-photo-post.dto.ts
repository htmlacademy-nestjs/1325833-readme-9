import { PostType } from '@project/core';
import { CreatePostDto } from './create-post.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePhotoPostDto extends CreatePostDto {
  type: PostType.PHOTO;

  @IsNotEmpty()
  @IsString()
  photoUrl: string;
}
