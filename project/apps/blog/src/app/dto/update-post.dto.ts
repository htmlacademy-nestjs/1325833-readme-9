import { IsDate, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { PostStatus } from '@project/core';

export class UpdatePostDto {
  @IsOptional()
  @IsNumber()
  commentsCount?: number;

  @IsOptional()
  @IsNumber()
  likesCount?: number;

  @IsOptional()
  @IsEnum(PostStatus)
  status?: PostStatus;

  @IsOptional()
  @IsDate()
  publishedAt?: Date;
}
