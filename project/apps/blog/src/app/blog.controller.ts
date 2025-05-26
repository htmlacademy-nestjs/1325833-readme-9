import { Controller, Post, Param, Get, Query } from '@nestjs/common';
import { BlogService } from './blog.service';
import { PostType, PostSort } from '@project/core';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post(':postType')
  async createPost(@Param('postType') postType: PostType) {
    return this.blogService.createPost(postType);
  }

  @Get()
  async getPosts(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('sort') sort: PostSort,
    @Query('type') type: PostType,
    @Query('userId') userId: string,
    @Query('tags') tags: string[]
  ) {
    console.log(page, limit, sort, type, userId, tags);
    return this.blogService.getPosts(page, limit, sort, type, userId, tags);
  }
}
