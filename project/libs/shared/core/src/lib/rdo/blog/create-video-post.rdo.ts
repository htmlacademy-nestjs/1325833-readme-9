import { CreatePostRdo } from './create-post.rdo';
import { PostType } from '../../types';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVideoPostRdo extends CreatePostRdo {
  @Expose()
  @ApiProperty({
    example: PostType.VIDEO,
    description: 'Post type',
    default: PostType.VIDEO,
  })
  type: PostType.VIDEO;

  @Expose()
  @ApiProperty({
    example: 'It is a post title',
    description: 'Post title',
  })
  title: string;

  @Expose()
  @ApiProperty({
    example: 'https://www.youtube.com/watch?v=2NplC4V1z0c',
    description: 'Post video url',
  })
  videoUrl: string;
}
