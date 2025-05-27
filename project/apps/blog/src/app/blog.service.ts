import { Injectable } from '@nestjs/common';
import { BlogRepository } from './blog.repository';
import {
  CreateLinkPostDto,
  CreatePhotoPostDto,
  CreateQuotePostDto,
  CreateTextPostDto,
  CreateVideoPostDto,
  GetPostsDto,
} from './dto';

@Injectable()
export class BlogService {
  constructor(private readonly blogRepository: BlogRepository) {}

  async createVideoPost(dto: CreateVideoPostDto) {
    return dto;
  }

  async createTextPost(dto: CreateTextPostDto) {
    return dto;
  }

  async createQuotePost(dto: CreateQuotePostDto) {
    return dto;
  }

  async createPhotoPost(dto: CreatePhotoPostDto) {
    return dto;
  }

  async createLinkPost(dto: CreateLinkPostDto) {
    return dto;
  }

  async getPosts(dto: GetPostsDto) {
    return this.blogRepository.getPosts(dto);
  }
}
