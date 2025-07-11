import { CreatePostRdo } from './create-post.rdo';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PostType } from '../../types';

export class CreatePhotoPostRdo extends CreatePostRdo {
  @Expose()
  @ApiProperty({
    example: PostType.PHOTO,
    description: 'Post type',
    default: PostType.PHOTO,
  })
  type: PostType.PHOTO;

  @Expose()
  @ApiProperty({
    example: 'https://example.com/photo',
    description: 'Photo url',
  })
  photoUrl: string;
}
