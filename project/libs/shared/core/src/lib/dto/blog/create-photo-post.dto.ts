import { PostType } from '../../types';
import { CreatePostDto } from './create-post.dto';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePhotoPostDto extends CreatePostDto {
  @IsOptional()
  @IsEnum(PostType)
  override type: PostType.PHOTO = PostType.PHOTO;

  @IsString()
  @ApiProperty({
    example: 'https://example.com/photo',
    description: 'Photo url',
  })
  photoUrl: string;
}
