import { Controller, Get, Param, Query } from '@nestjs/common';
import { GetPostsDto } from '@project/core';
import { PostsService } from './posts.service';

@Controller('blog')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getPosts(@Query() dto: GetPostsDto) {
    return this.postsService.getPosts(dto);
  }

  @Get(':id')
  async getPostById(@Param('id') id: string) {
    return this.postsService.getPostById(id);
  }

  @Get('search')
  async searchPosts(@Query('query') query: string) {
    return this.postsService.searchPosts(query);
  }
}
