import { PostType } from '@project/core';
import { CreatePostDto } from './create-post.dto';
import { IsEnum, IsOptional, IsUrl } from 'class-validator';

export class CreatePhotoPostDto extends CreatePostDto {
  @IsOptional()
  @IsEnum(PostType)
  override type: PostType.PHOTO = PostType.PHOTO;

  @IsUrl()
  photoUrl: string;
}
