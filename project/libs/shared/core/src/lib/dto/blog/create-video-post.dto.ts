import { CreatePostDto } from './create-post.dto';
import { PostType } from '../../types';
import {
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVideoPostDto extends CreatePostDto {
  @IsOptional()
  @IsEnum(PostType)
  override type: PostType.VIDEO = PostType.VIDEO;

  @IsString()
  @Length(20, 50)
  @ApiProperty({
    example: 'Post title',
    description: 'Post title',
    minLength: 20,
    maxLength: 50,
  })
  title: string;

  @IsUrl()
  @Matches(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/)
  @ApiProperty({
    example: 'https://www.youtube.com/embed/',
    description: 'Post youtube video url',
  })
  videoUrl: string;
}
