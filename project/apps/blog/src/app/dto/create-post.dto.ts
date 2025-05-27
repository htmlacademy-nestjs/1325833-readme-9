import { IsTags, PostStatus } from '@project/core';
import { Transform } from 'class-transformer';

export class CreatePostDto {
  status: PostStatus.DRAFT;

  @IsTags()
  @Transform(({ value }) => {
    return !value
      ? undefined
      : [...new Set(value.map((tag: string) => tag.toLowerCase()))];
  })
  tags?: string[];
}
