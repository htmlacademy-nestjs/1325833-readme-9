import { PostType } from '../../types';
import { CreatePostDto } from './create-post.dto';
import { IsEnum, IsOptional, IsString, IsUrl, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLinkPostDto extends CreatePostDto {
  @IsOptional()
  @IsEnum(PostType)
  override type: PostType.LINK = PostType.LINK;

  @IsUrl()
  @ApiProperty({
    example: 'https://example.com/link',
    description: 'Link',
  })
  link: string;

  @IsOptional()
  @IsString()
  @Length(1, 300)
  @ApiProperty({
    example: 'This is just a link',
    description: 'The link description',
    minLength: 1,
    maxLength: 300,
    required: false,
  })
  description?: string;
}
