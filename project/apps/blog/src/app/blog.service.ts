import { Injectable } from '@nestjs/common';
import {
  DEFAULT_POSTS_LIMIT,
  DEFAULT_POSTS_PAGE,
  MAX_POSTS_LIMIT,
  PostSort,
  PostType,
} from '@project/core';
import { BlogRepository } from './blog.repository';

@Injectable()
export class BlogService {
  constructor(private readonly blogRepository: BlogRepository) {}

  async createPost(postType: PostType) {
    return postType;
  }

  async getPosts(
    page: number,
    limit: number,
    sort: PostSort = PostSort.DATE,
    type: PostType,
    userId: string,
    tags: string[]
  ) {
    let _page = page || DEFAULT_POSTS_PAGE;
    if (page < DEFAULT_POSTS_PAGE) {
      _page = DEFAULT_POSTS_PAGE;
    }

    let _limit = limit || DEFAULT_POSTS_LIMIT;
    if (limit > MAX_POSTS_LIMIT) {
      _limit = MAX_POSTS_LIMIT;
    }

    return this.blogRepository.getPosts(
      _page,
      _limit,
      sort,
      type,
      userId,
      tags
    );
  }
}
