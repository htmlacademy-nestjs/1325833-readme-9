import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CommentPostDto {
  @IsString()
  @Length(10, 300)
  @ApiProperty({
    example: `It's a comment to a post`,
    description: 'Comment to a post',
    minLength: 10,
    maxLength: 300,
  })
  text: string;
}
