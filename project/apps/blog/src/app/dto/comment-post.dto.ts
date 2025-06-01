import { IsString, Length } from 'class-validator';

export class CommentPostDto {
  @IsString()
  @Length(10, 300)
  text: string;
}
