import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  CreatePostSwaggerDecorator,
  MyDraftsSwaggerDecorator,
  PublishPostSwaggerDecorator,
  RepostPostSwaggerDecorator,
  DeletePostSwaggerDecorator,
  LikePostSwaggerDecorator,
} from '@project/swagger';
import {
  CurrentUser,
  JwtAuthGuard,
  PostStatus,
  PostType,
  CommonPostRdo,
  CreateLinkPostRdo,
  CreatePhotoPostRdo,
  CreateQuotePostRdo,
  CreateTextPostRdo,
  CreateVideoPostRdo,
  CreateLinkPostDto,
  CreatePhotoPostDto,
  CreateQuotePostDto,
  CreateTextPostDto,
  CreateVideoPostDto,
  LikePostRdo,
} from '@project/core';
import { PostsService } from './posts.service';

@Controller('blog')
@UseGuards(JwtAuthGuard)
export class PostsWithGuardsController {
  constructor(private readonly postsService: PostsService) {}

  @Post(PostType.VIDEO)
  @CreatePostSwaggerDecorator(PostType.VIDEO, CreateVideoPostRdo)
  async createVideoPost(
    @Body() dto: CreateVideoPostDto,
    @CurrentUser('id') id: string
  ): Promise<CreateVideoPostRdo> {
    return this.postsService.createVideoPost(dto, id);
  }

  @Post(PostType.TEXT)
  @CreatePostSwaggerDecorator(PostType.TEXT, CreateTextPostRdo)
  async createTextPost(
    @Body() dto: CreateTextPostDto,
    @CurrentUser('id') id: string
  ): Promise<CreateTextPostRdo> {
    return this.postsService.createTextPost(dto, id);
  }

  @Post(PostType.QUOTE)
  @CreatePostSwaggerDecorator(PostType.QUOTE, CreateQuotePostRdo)
  async createQuotePost(
    @Body() dto: CreateQuotePostDto,
    @CurrentUser('id') id: string
  ): Promise<CreateQuotePostRdo> {
    return this.postsService.createQuotePost(dto, id);
  }

  @Post(PostType.PHOTO)
  @CreatePostSwaggerDecorator(PostType.PHOTO, CreatePhotoPostRdo)
  async createPhotoPost(
    @Body() dto: CreatePhotoPostDto,
    @CurrentUser('id') id: string
  ): Promise<CreatePhotoPostRdo> {
    return this.postsService.createPhotoPost(dto, id);
  }

  @Post(PostType.LINK)
  @CreatePostSwaggerDecorator(PostType.LINK, CreateLinkPostRdo)
  async createLinkPost(
    @Body() dto: CreateLinkPostDto,
    @CurrentUser('id') id: string
  ): Promise<CreateLinkPostRdo> {
    return this.postsService.createLinkPost(dto, id);
  }

  @Get('my-drafts')
  @MyDraftsSwaggerDecorator()
  async getMyDrafts(
    @CurrentUser('id') userId: string
  ): Promise<CommonPostRdo[]> {
    return this.postsService.getMyDrafts(userId);
  }

  @Post('publish/:id')
  @PublishPostSwaggerDecorator()
  async publishPost(
    @Param('id') postId: string,
    @CurrentUser('id') userId: string
  ): Promise<CommonPostRdo> {
    const dto = {
      status: PostStatus.PUBLISHED,
      publishedAt: new Date(),
    };

    return this.postsService.updatePost(dto, postId, userId);
  }

  @Delete(':id')
  @DeletePostSwaggerDecorator()
  async deletePost(
    @Param('id') postId: string,
    @CurrentUser('id') userId: string
  ) {
    return this.postsService.deletePost(postId, userId);
  }

  @Post('repost-post/:id')
  @RepostPostSwaggerDecorator()
  async repostPost(
    @Param('id') postId: string,
    @CurrentUser('id') userId: string
  ) {
    return this.postsService.repostPost(postId, userId);
  }

  @Post('like/:id')
  @LikePostSwaggerDecorator()
  async likePost(
    @Param('id') postId: string,
    @CurrentUser('id') userId: string
  ): Promise<LikePostRdo> {
    return this.postsService.likePost(postId, userId);
  }
}
