import { IsInt, IsOptional, Max, Min } from 'class-validator';
import {
  DEFAULT_COMMENTS_PAGE,
  MIN_COMMENTS_LIMIT,
  MAX_COMMENTS_LIMIT,
  DEFAULT_COMMENTS_LIMIT,
} from '../../constants';
import { ApiProperty } from '@nestjs/swagger';

export class GetCommentsDto {
  @IsOptional()
  @IsInt()
  @Min(DEFAULT_COMMENTS_PAGE)
  @ApiProperty({
    example: DEFAULT_COMMENTS_PAGE,
    description: 'Current page',
    required: false,
  })
  page: number = DEFAULT_COMMENTS_PAGE;

  @IsOptional()
  @IsInt()
  @Min(MIN_COMMENTS_LIMIT)
  @Max(MAX_COMMENTS_LIMIT)
  @ApiProperty({
    example: DEFAULT_COMMENTS_LIMIT,
    description: 'Posts limit',
    required: false,
  })
  limit: number = DEFAULT_COMMENTS_LIMIT;
}
