import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser, JwtAuthGuard, PostStatus, PostType } from '@project/core';
import { CreatePostSwaggerDecorator } from './swagger';
import {
  CreateLinkPostRdo,
  CreatePhotoPostRdo,
  CreateQuotePostRdo,
  CreateTextPostRdo,
  CreateVideoPostRdo,
} from './rdo';
import {
  CreateLinkPostDto,
  CreatePhotoPostDto,
  CreateQuotePostDto,
  CreateTextPostDto,
  CreateVideoPostDto,
} from './dto';
import { PostsService } from './posts.service';

@Controller('blog')
@UseGuards(JwtAuthGuard)
export class PostsWithGuardsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('video')
  @CreatePostSwaggerDecorator(PostType.VIDEO, CreateVideoPostRdo)
  async createVideoPost(
    @Body() dto: CreateVideoPostDto,
    @CurrentUser('id') id: string
  ) {
    return this.postsService.createVideoPost(dto, id);
  }

  @Post('text')
  @CreatePostSwaggerDecorator(PostType.TEXT, CreateTextPostRdo)
  async createTextPost(
    @Body() dto: CreateTextPostDto,
    @CurrentUser('id') id: string
  ) {
    return this.postsService.createTextPost(dto, id);
  }

  @Post('quote')
  @CreatePostSwaggerDecorator(PostType.QUOTE, CreateQuotePostRdo)
  async createQuotePost(
    @Body() dto: CreateQuotePostDto,
    @CurrentUser('id') id: string
  ) {
    return this.postsService.createQuotePost(dto, id);
  }

  @Post('photo')
  @CreatePostSwaggerDecorator(PostType.PHOTO, CreatePhotoPostRdo)
  async createPhotoPost(
    @Body() dto: CreatePhotoPostDto,
    @CurrentUser('id') id: string
  ) {
    return this.postsService.createPhotoPost(dto, id);
  }

  @Post('link')
  @CreatePostSwaggerDecorator(PostType.LINK, CreateLinkPostRdo)
  async createLinkPost(
    @Body() dto: CreateLinkPostDto,
    @CurrentUser('id') id: string
  ) {
    return this.postsService.createLinkPost(dto, id);
  }

  @Get('my-drafts')
  async getMyDrafts(@CurrentUser('id') userId: string) {
    return this.postsService.getMyDrafts(userId);
  }

  @Post('publish/:id')
  async publishPost(
    @Param('id') postId: string,
    @CurrentUser('id') userId: string
  ) {
    const dto = {
      status: PostStatus.PUBLISHED,
      publishedAt: new Date(),
    };

    return this.postsService.updatePost(dto, postId, userId);
  }

  @Delete(':id')
  async deletePost(
    @Param('id') postId: string,
    @CurrentUser('id') userId: string
  ) {
    return this.postsService.deletePost(postId, userId);
  }

  @Post('repost-post/:id')
  async repostPost(
    @Param('id') postId: string,
    @CurrentUser('id') userId: string
  ) {
    return this.postsService.repostPost(postId, userId);
  }

  @Post('like/:id')
  async likePost(
    @Param('id') postId: string,
    @CurrentUser('id') userId: string
  ) {
    return this.postsService.likePost(postId, userId);
  }
}
