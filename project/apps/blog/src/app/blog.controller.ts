import { Controller, Post, Param, Get, Query } from '@nestjs/common';
import { BlogService } from './blog.service';
import { PostType } from '@project/core';
import { GetPostsDto } from './dto';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post('video')
  async createVideoPost(@Param('postType') postType: PostType) {
    return this.blogService.createPost(postType);
  }

  @Post('text')
  async createTextPost(@Param('postType') postType: PostType) {
    return this.blogService.createPost(postType);
  }

  @Post('quote')
  async createQuotePost(@Param('postType') postType: PostType) {
    return this.blogService.createPost(postType);
  }

  @Post('photo')
  async createPhotoPost(@Param('postType') postType: PostType) {
    return this.blogService.createPost(postType);
  }

  @Post('link')
  async createLinkPost(@Param('postType') postType: PostType) {
    return this.blogService.createPost(postType);
  }

  @Get()
  async getPosts(@Query() dto: GetPostsDto) {
    console.log(dto);
    return this.blogService.getPosts(dto);
  }
}
