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

  @Get()
  async getPosts(@Query() dto: GetPostsDto) {
    console.log(dto);
    return this.blogService.getPosts(dto);
  }
}
