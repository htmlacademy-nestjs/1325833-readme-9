import { IsTags, PostStatus } from '@project/core';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class CreatePostDto {
  @IsOptional()
  status: PostStatus = PostStatus.DRAFT;

  @IsTags()
  @Transform(({ value }) => {
    return !value
      ? undefined
      : [...new Set(value.map((tag: string) => tag.toLowerCase()))];
  })
  tags?: string[];
}
