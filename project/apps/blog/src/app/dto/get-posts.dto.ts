import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import {
  DEFAULT_POSTS_LIMIT,
  DEFAULT_POSTS_PAGE,
  MAX_POSTS_LIMIT,
  MIN_POSTS_LIMIT,
  PostSort,
  PostType,
  IsTags,
  PostStatus,
} from '@project/core';
import { Transform } from 'class-transformer';

export class GetPostsDto {
  @IsOptional()
  @IsInt()
  @Min(DEFAULT_POSTS_PAGE)
  page: number = DEFAULT_POSTS_PAGE;

  @IsOptional()
  @IsInt()
  @Min(MIN_POSTS_LIMIT)
  @Max(MAX_POSTS_LIMIT)
  limit: number = DEFAULT_POSTS_LIMIT;

  @IsOptional()
  @IsEnum(PostSort)
  sort: PostSort = PostSort.DATE;

  @IsOptional()
  @IsEnum(PostType)
  type?: PostType;

  @IsOptional()
  @IsTags()
  @Transform(({ value }) => {
    return !value
      ? undefined
      : [...new Set(JSON.parse(value).map((tag: string) => tag.toLowerCase()))];
  })
  tags?: string[];

  @IsOptional()
  authorId?: string;

  @IsOptional()
  @IsEnum(PostStatus)
  status?: PostStatus;
}
