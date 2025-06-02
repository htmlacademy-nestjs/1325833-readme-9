import { CreatePostDto } from './create-post.dto';
import { PostType } from '@project/core';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTextPostDto extends CreatePostDto {
  @IsOptional()
  @IsEnum(PostType)
  override type: PostType.TEXT = PostType.TEXT;

  @IsString()
  @Length(20, 50)
  @ApiProperty({
    example: 'Big post',
    description: 'Post title',
    minLength: 20,
    maxLength: 50,
  })
  title: string;

  @IsString()
  @Length(50, 255)
  @ApiProperty({
    example: 'Post',
    description: 'Post preview',
    minLength: 50,
    maxLength: 255,
  })
  preview: string;

  @IsString()
  @Length(100, 1024)
  @ApiProperty({
    example:
      'This is a big post This is a big post This is a big post This is a big post This is a big post This is a big post This is a big post This is a big post This is a big post This is a big post This is a big post',
    description: 'Post content',
    minLength: 100,
    maxLength: 1024,
  })
  content: string;
}
