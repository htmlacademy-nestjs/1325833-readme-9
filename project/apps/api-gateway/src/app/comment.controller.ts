import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  CommentPostDto,
  HTTP_CLIENT,
  HttpClientImpl,
  CommentPostRdo,
  DeleteCommentRdo,
  GetCommentsDto,
} from '@project/core';
import {
  CommentPostSwaggerDecorator,
  DeleteCommentSwaggerDecorator,
  GetCommentsSwaggerDecorator,
} from '@project/swagger';

@Controller('comment')
export class CommentController {
  blogServiceUrl?: string;

  constructor(
    private readonly configService: ConfigService,
    @Inject(HTTP_CLIENT) private readonly httpClient: HttpClientImpl
  ) {
    this.blogServiceUrl = this.configService.get<string>(
      'application.blogServiceUrl'
    );
  }

  @Delete(':postId/:commentId')
  @DeleteCommentSwaggerDecorator()
  async deleteComment(
    @Param('postId') postId: string,
    @Param('commentId') commentId: string
  ): Promise<DeleteCommentRdo> {
    return this.httpClient.delete(
      `${this.blogServiceUrl}/blog/comment/${postId}/${commentId}`
    );
  }

  @Post(':id')
  @CommentPostSwaggerDecorator()
  async commentPost(
    @Param('id') id: string,
    @Body() dto: CommentPostDto
  ): Promise<CommentPostRdo> {
    return this.httpClient.post(
      `${this.blogServiceUrl}/blog/comment/${id}`,
      dto
    );
  }

  @Get(':id')
  @GetCommentsSwaggerDecorator()
  async getComments(
    @Query() dto: GetCommentsDto,
    @Param('id') id: string
  ): Promise<CommentPostRdo[]> {
    return this.httpClient.get(
      `${this.blogServiceUrl}/blog/comment/${id}`,
      dto
    );
  }
}
