import { Injectable } from '@nestjs/common';
import { BlogRepository } from './blog.repository';
import {
  CreateLinkPostDto,
  CreatePhotoPostDto,
  CreateQuotePostDto,
  CreateTextPostDto,
  CreateVideoPostDto,
  GetPostsDto,
  UpdatePostDto,
} from './dto';

@Injectable()
export class BlogService {
  constructor(private readonly blogRepository: BlogRepository) {}

  async createVideoPost(dto: CreateVideoPostDto, userId: string) {
    return this.blogRepository.createPost(dto, userId);
  }

  async createTextPost(dto: CreateTextPostDto, userId: string) {
    return this.blogRepository.createPost(dto, userId);
  }

  async createQuotePost(dto: CreateQuotePostDto, userId: string) {
    return this.blogRepository.createPost(dto, userId);
  }

  async createPhotoPost(dto: CreatePhotoPostDto, userId: string) {
    return this.blogRepository.createPost(dto, userId);
  }

  async createLinkPost(dto: CreateLinkPostDto, userId: string) {
    return this.blogRepository.createPost(dto, userId);
  }

  async getPosts(dto: GetPostsDto) {
    return this.blogRepository.findMany(dto);
  }

  async updatePost(dto: UpdatePostDto, postId: string, userId: string) {
    return this.blogRepository.updatePost(dto, postId, userId);
  }

  async deletePost(postId: string, userId: string) {
    return this.blogRepository.deletePost(postId, userId);
  }
}
