import { CreatePostRdo } from './create-post.rdo';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PostType } from '@project/core';

export class CreatePhotoPostRdo extends CreatePostRdo {
  @Expose()
  @ApiProperty({
    example: PostType.PHOTO,
    description: 'Post type',
    default: PostType.PHOTO,
  })
  type: PostType.PHOTO;

  @ApiProperty({
    example: 'https://example.com/photo',
    description: 'Photo url',
  })
  photoUrl: string;
}
