import { Injectable } from '@nestjs/common';
import { PostType } from '@project/core';
import { BlogRepository } from './blog.repository';
import { GetPostsDto } from './dto';

@Injectable()
export class BlogService {
  constructor(private readonly blogRepository: BlogRepository) {}

  async createPost(postType: PostType) {
    return postType;
  }

  async getPosts(dto: GetPostsDto) {
    return this.blogRepository.getPosts(dto);
  }
}
