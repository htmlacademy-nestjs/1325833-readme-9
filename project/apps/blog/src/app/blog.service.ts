import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    return this.blogRepository.findManyPosts(dto);
  }

  async updatePost(dto: UpdatePostDto, postId: string, userId: string) {
    return this.blogRepository.updatePost(dto, postId, userId);
  }

  async likePost(postId: string, userId: string) {
    try {
      const existingLike = await this.blogRepository.findLikeByUserAndPostId(
        postId,
        userId
      );

      const like = existingLike
        ? await this.blogRepository.deleteLike(existingLike.id)
        : await this.blogRepository.createLike(postId, userId);

      const post = await this.blogRepository.findPostById(postId);

      if (!post) {
        throw new NotFoundException('Post not found');
      }

      await this.updatePost(
        {
          likesCount: existingLike
            ? (post.likesCount -= 1)
            : (post.likesCount += 1),
        },
        postId,
        userId
      );

      return like;
    } catch {
      throw new BadRequestException('Like failed');
    }
  }

  async deletePost(postId: string, userId: string) {
    return this.blogRepository.deletePost(postId, userId);
  }
}
