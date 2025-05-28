import { IsEnum, IsOptional } from 'class-validator';
import { PostStatus } from '@project/core';

export class UpdatePostDto {
  @IsOptional()
  commentsCount?: number;

  @IsOptional()
  likesCount?: number;

  @IsOptional()
  @IsEnum(PostStatus)
  status?: PostStatus;
}
