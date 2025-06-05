import { IsTags, PostStatus, PostType } from '@project/core';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
    example: `['cats', 'IT']`,
    description: 'Post tags',
    required: false,
  })
  tags?: string[];
}
