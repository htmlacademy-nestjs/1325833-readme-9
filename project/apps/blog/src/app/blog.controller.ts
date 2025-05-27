import { Controller, Post, Get, Query, Body, UseGuards } from '@nestjs/common';
import { BlogService } from './blog.service';
import {
  CreateLinkPostDto,
  CreatePhotoPostDto,
  CreateQuotePostDto,
  CreateTextPostDto,
  CreateVideoPostDto,
  GetPostsDto,
} from './dto';
import { CurrentUser, JwtAuthGuard } from '@project/core';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post('video')
  @UseGuards(JwtAuthGuard)
  async createVideoPost(
    @Body() dto: CreateVideoPostDto,
    @CurrentUser('id') id: string
  ) {
    return this.blogService.createVideoPost(dto);
  }

  @Post('text')
  async createTextPost(
    @Body() dto: CreateTextPostDto,
    @CurrentUser('id') id: string
  ) {
    return this.blogService.createTextPost(dto);
  }

  @Post('quote')
  async createQuotePost(
    @Body() dto: CreateQuotePostDto,
    @CurrentUser('id') id: string
  ) {
    return this.blogService.createQuotePost(dto);
  }

  @Post('photo')
  async createPhotoPost(
    @Body() dto: CreatePhotoPostDto,
    @CurrentUser('id') id: string
  ) {
    return this.blogService.createPhotoPost(dto);
  }

  @Post('link')
  async createLinkPost(
    @Body() dto: CreateLinkPostDto,
    @CurrentUser('id') id: string
  ) {
    return this.blogService.createLinkPost(dto);
  }

  @Get()
  async getPosts(@Query() dto: GetPostsDto) {
    console.log(dto);
    return this.blogService.getPosts(dto);
  }
}
