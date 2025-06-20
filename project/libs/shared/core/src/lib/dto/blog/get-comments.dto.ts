import { IsInt, IsOptional, Max, Min } from 'class-validator';
import {
  DEFAULT_COMMENTS_PAGE,
  MIN_COMMENTS_LIMIT,
  MAX_COMMENTS_LIMIT,
  DEFAULT_COMMENTS_LIMIT,
} from '../../constants';

export class GetCommentsDto {
  @IsOptional()
  @IsInt()
  @Min(DEFAULT_COMMENTS_PAGE)
  page: number = DEFAULT_COMMENTS_PAGE;

  @IsOptional()
  @IsInt()
  @Min(MIN_COMMENTS_LIMIT)
  @Max(MAX_COMMENTS_LIMIT)
  limit: number = DEFAULT_COMMENTS_LIMIT;
}
