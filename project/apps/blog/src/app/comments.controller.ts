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
import {
  CurrentUser,
  JwtAuthGuard,
  CommentPostDto,
  GetCommentsDto,
  CommentPostRdo,
  DeleteCommentRdo,
} from '@project/core';
import {
  CommentPostSwaggerDecorator,
  DeleteCommentSwaggerDecorator,
  GetCommentsSwaggerDecorator,
} from '@project/swagger';

@Controller('blog')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('comment/:id')
  @UseGuards(JwtAuthGuard)
  @CommentPostSwaggerDecorator()
  async commentPost(
    @Param('id') postId: string,
    @Body() dto: CommentPostDto,
    @CurrentUser('id') userId: string
  ): Promise<CommentPostRdo> {
    return this.commentsService.commentPost(dto, postId, userId);
  }

  @Delete('comment/:postId/:commentId')
  @UseGuards(JwtAuthGuard)
  @DeleteCommentSwaggerDecorator()
  async deleteComment(
    @Param('postId') postId: string,
    @Param('commentId') commentId: string,
    @CurrentUser('id') userId: string
  ): Promise<DeleteCommentRdo> {
    return this.commentsService.deleteComment(postId, commentId, userId);
  }

  @Get('comment/:id')
  @GetCommentsSwaggerDecorator()
  async getComments(
    @Query() dto: GetCommentsDto,
    @Param('id') postId: string
  ): Promise<CommentPostRdo[]> {
    return this.commentsService.getComments(dto, postId);
  }
}
