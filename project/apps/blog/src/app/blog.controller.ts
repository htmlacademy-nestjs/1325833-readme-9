import { Controller, Post, Get, Query, Body } from '@nestjs/common';
import { BlogService } from './blog.service';
import {
  CreateLinkPostDto,
  CreatePhotoPostDto,
  CreateQuotePostDto,
  CreateTextPostDto,
  CreateVideoPostDto,
  GetPostsDto,
} from './dto';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post('video')
  async createVideoPost(@Body() dto: CreateVideoPostDto) {
    console.log(dto);
    return this.blogService.createVideoPost(dto);
  }

  @Post('text')
  async createTextPost(@Body() dto: CreateTextPostDto) {
    return this.blogService.createTextPost(dto);
  }

  @Post('quote')
  async createQuotePost(@Body() dto: CreateQuotePostDto) {
    return this.blogService.createQuotePost(dto);
  }

  @Post('photo')
  async createPhotoPost(@Body() dto: CreatePhotoPostDto) {
    return this.blogService.createPhotoPost(dto);
  }

  @Post('link')
  async createLinkPost(@Body() dto: CreateLinkPostDto) {
    return this.blogService.createLinkPost(dto);
  }

  @Get()
  async getPosts(@Query() dto: GetPostsDto) {
    console.log(dto);
    return this.blogService.getPosts(dto);
  }
}
