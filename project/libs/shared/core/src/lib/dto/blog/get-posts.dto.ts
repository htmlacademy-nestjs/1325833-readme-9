import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import {
  DEFAULT_POSTS_LIMIT,
  DEFAULT_POSTS_PAGE,
  MAX_POSTS_LIMIT,
  MIN_POSTS_LIMIT,
} from '../../constants';
import { PostType, PostStatus, PostSort } from '../../types';
import { IsTags } from '../../decorators';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GetPostsDto {
  @IsOptional()
  @IsInt()
  @Min(DEFAULT_POSTS_PAGE)
  @ApiProperty({
    example: DEFAULT_POSTS_PAGE,
    description: 'Current page',
    required: false,
  })
  page: number = DEFAULT_POSTS_PAGE;

  @IsOptional()
  @IsInt()
  @Min(MIN_POSTS_LIMIT)
  @Max(MAX_POSTS_LIMIT)
  @ApiProperty({
    example: DEFAULT_POSTS_LIMIT,
    description: 'Posts limit',
    required: false,
  })
  limit: number = DEFAULT_POSTS_LIMIT;

  @IsOptional()
  @IsEnum(PostSort)
  @ApiProperty({
    enum: PostSort,
    example: PostSort.DATE,
    description: 'Posts sort type',
    required: false,
  })
  sort: PostSort = PostSort.DATE;

  @IsOptional()
  @IsEnum(PostType)
  @ApiProperty({
    enum: PostType,
    example: PostType.VIDEO,
    description: 'Posts type',
    required: false,
  })
  type?: PostType;

  @IsOptional()
  @IsTags()
  @Transform(({ value }) => {
    return !value
      ? undefined
      : [...new Set(JSON.parse(value).map((tag: string) => tag.toLowerCase()))];
  })
  @ApiProperty({
    isArray: true,
    example: ['cats', 'dogs'],
    description: 'Posts tags',
    required: false,
  })
  tags?: string[];

  @IsOptional()
  @ApiProperty({
    example: 'fwqfwqf-214124-fwqfwqf2-121',
    description: 'Posts author id',
    required: false,
  })
  authorId?: string;

  @IsOptional()
  @IsEnum(PostStatus)
  @ApiProperty({
    enum: PostStatus,
    example: PostStatus.PUBLISHED,
    description: 'Posts status',
    required: false,
  })
  status?: PostStatus;
}
