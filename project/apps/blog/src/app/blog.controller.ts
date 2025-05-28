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
  CreateLinkPostDto,
  CreatePhotoPostDto,
  CreateQuotePostDto,
  CreateTextPostDto,
  CreateVideoPostDto,
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

  @Post('publish/:id')
  @UseGuards(JwtAuthGuard)
  async publishPost(
    @Param('id') postId: string,
    @CurrentUser('id') userId: string
  ) {
    const dto = {
      status: PostStatus.PUBLISHED,
    };

    return this.blogService.updatePost(dto, postId, userId);
  }

  @Get()
  async getPosts(@Query() dto: GetPostsDto) {
    return this.blogService.getPosts(dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deletePost(
    @Param('id') postId: string,
    @CurrentUser('id') userId: string
  ) {
    return this.blogService.deletePost(postId, userId);
  }
}
