import { PostStatus, PostType } from '../../types';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsTags } from '../../decorators';

export class CreatePostDto {
  @IsOptional()
  @IsEnum(PostType)
  type: PostType;

  @IsOptional()
  status: PostStatus = PostStatus.DRAFT;

  @IsTags()
  @Transform(({ value }) => {
    return !value
      ? undefined
      : [...new Set(value.map((tag: string) => tag.toLowerCase()))];
  })
  @ApiProperty({
    example: ['cats', 'IT'],
    description: 'Post tags',
    required: false,
  })
  tags?: string[];
}
