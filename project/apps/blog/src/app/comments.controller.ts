import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentPostDto, GetCommentsDto } from './dto';
import { CurrentUser, JwtAuthGuard } from '@project/core';

@Controller('blog')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('comment/:id')
  @UseGuards(JwtAuthGuard)
  async commentPost(
    @Param('id') postId: string,
    @Body() dto: CommentPostDto,
    @CurrentUser('id') userId: string
  ) {
    return this.commentsService.commentPost(dto, postId, userId);
  }

  @Delete('comment/:postId/:commentId')
  @UseGuards(JwtAuthGuard)
  async deleteComment(
    @Param('postId') postId: string,
    @Param('commentId') commentId: string,
    @CurrentUser('id') userId: string
  ) {
    return this.commentsService.deleteComment(postId, commentId, userId);
  }

  @Get('comment/:id')
  async getComments(@Query() dto: GetCommentsDto, @Param('id') postId: string) {
    return this.commentsService.getComments(dto, postId);
  }
}
