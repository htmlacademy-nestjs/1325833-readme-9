import { IsBoolean, IsDate, IsNotEmpty, IsString } from 'class-validator';
import { CreatePostDto } from './create-post.dto';

export class CreateRepostDto extends CreatePostDto {
  @IsNotEmpty()
  @IsString()
  originalPostId: string;

  @IsBoolean()
  isRepost: boolean;

  @IsDate()
  publishedAt: Date;

  @IsNotEmpty()
  @IsString()
  originalPostAuthorId: string;
}
