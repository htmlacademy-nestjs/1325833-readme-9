import { Controller, Get, Param, Query } from '@nestjs/common';
import { GetPostsDto } from '@project/core';
import { PostsService } from './posts.service';
import {
  GetPostsSwaggerDecorator,
  SearchPostsSwaggerDecorator,
  GetPostByIdSwaggerDecorator,
} from '@project/swagger';

@Controller('blog')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @GetPostsSwaggerDecorator()
  async getPosts(@Query() dto: GetPostsDto) {
    return this.postsService.getPosts(dto);
  }

  @Get('search')
  @SearchPostsSwaggerDecorator()
  async searchPosts(@Query('query') query: string) {
    return this.postsService.searchPosts(query);
  }

  @Get(':id')
  @GetPostByIdSwaggerDecorator()
  async getPostById(@Param('id') id: string) {
    return this.postsService.getPostById(id);
  }
}
