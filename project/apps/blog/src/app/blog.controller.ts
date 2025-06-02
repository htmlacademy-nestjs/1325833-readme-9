import {
  Controller,
  Post,
  Get,
  Query,
  Body,
  UseGuards,
  Delete,
  Param,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import {
  CommentPostDto,
  CreateLinkPostDto,
  CreatePhotoPostDto,
  CreateQuotePostDto,
  CreateTextPostDto,
  CreateVideoPostDto,
  GetCommentsDto,
  GetPostsDto,
} from './dto';
import { CurrentUser, JwtAuthGuard, PostStatus } from '@project/core';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post('video')
  @UseGuards(JwtAuthGuard)
  async createVideoPost(
    @Body() dto: CreateVideoPostDto,
    @CurrentUser('id') id: string
  ) {
    return this.blogService.createVideoPost(dto, id);
  }

  @Post('text')
  @UseGuards(JwtAuthGuard)
  async createTextPost(
    @Body() dto: CreateTextPostDto,
    @CurrentUser('id') id: string
  ) {
    return this.blogService.createTextPost(dto, id);
  }

  @Post('quote')
  @UseGuards(JwtAuthGuard)
  async createQuotePost(
    @Body() dto: CreateQuotePostDto,
    @CurrentUser('id') id: string
  ) {
    return this.blogService.createQuotePost(dto, id);
  }

  @Post('photo')
  @UseGuards(JwtAuthGuard)
  async createPhotoPost(
    @Body() dto: CreatePhotoPostDto,
    @CurrentUser('id') id: string
  ) {
    return this.blogService.createPhotoPost(dto, id);
  }

  @Post('link')
  @UseGuards(JwtAuthGuard)
  async createLinkPost(
    @Body() dto: CreateLinkPostDto,
    @CurrentUser('id') id: string
  ) {
    return this.blogService.createLinkPost(dto, id);
  }

  @Get('my-drafts')
  @UseGuards(JwtAuthGuard)
  async getMyDrafts(@CurrentUser('id') userId: string) {
    return this.blogService.getMyDrafts(userId);
  }

  @Post('publish/:id')
  @UseGuards(JwtAuthGuard)
  async publishPost(
    @Param('id') postId: string,
    @CurrentUser('id') userId: string
  ) {
    const dto = {
      status: PostStatus.PUBLISHED,
      publishedAt: new Date(),
    };

    return this.blogService.updatePost(dto, postId, userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deletePost(
    @Param('id') postId: string,
    @CurrentUser('id') userId: string
  ) {
    return this.blogService.deletePost(postId, userId);
  }

  @Post('like/:id')
  @UseGuards(JwtAuthGuard)
  async likePost(
    @Param('id') postId: string,
    @CurrentUser('id') userId: string
  ) {
    return this.blogService.likePost(postId, userId);
  }

  @Post('comment/:id')
  @UseGuards(JwtAuthGuard)
  async commentPost(
    @Param('id') postId: string,
    @Body() dto: CommentPostDto,
    @CurrentUser('id') userId: string
  ) {
    return this.blogService.commentPost(dto, postId, userId);
  }

  @Delete('comment/:postId/:commentId')
  @UseGuards(JwtAuthGuard)
  async deleteComment(
    @Param('postId') postId: string,
    @Param('commentId') commentId: string,
    @CurrentUser('id') userId: string
  ) {
    return this.blogService.deleteComment(postId, commentId, userId);
  }

  @Get()
  async getPosts(@Query() dto: GetPostsDto) {
    return this.blogService.getPosts(dto);
  }

  @Get(':id')
  async getPostById(@Param('id') id: string) {
    return this.blogService.getPostById(id);
  }

  @Get('comment/:id')
  async getComments(@Query() dto: GetCommentsDto, @Param('id') postId: string) {
    return this.blogService.getComments(dto, postId);
  }

  @Post('repost-post/:id')
  async repostPost(
    @Param('id') postId: string,
    @CurrentUser('id') userId: string
  ) {
    return this.blogService.repostPost(postId, userId);
  }
}
