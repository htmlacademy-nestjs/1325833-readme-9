import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BlogRepository } from './blog.repository';
import {
  CommentPostDto,
  CreateLinkPostDto,
  CreatePhotoPostDto,
  CreateQuotePostDto,
  CreateTextPostDto,
  CreateVideoPostDto,
  GetCommentsDto,
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

  async getPostById(id: string) {
    return this.blogRepository.findPostById(id);
  }

  async repostPost(postId: string, userId: string) {
    return this.blogRepository.updatePost();
  }

  async updatePost(dto: UpdatePostDto, postId: string, userId?: string) {
    return this.blogRepository.updatePost(dto, postId, userId);
  }

  async likePost(postId: string, userId: string) {
    try {
      const existingLike = await this.blogRepository.findLikeByUserAndPostId(
        postId,
        userId
      );

      const like = existingLike
        ? await this.blogRepository.deleteLike(existingLike.id, userId)
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
        postId
      );

      return like;
    } catch {
      throw new BadRequestException('Like failed');
    }
  }

  async commentPost(dto: CommentPostDto, postId: string, userId: string) {
    try {
      const comment = await this.blogRepository.createComment(
        dto,
        postId,
        userId
      );

      const post = await this.blogRepository.findPostById(postId);

      if (!post) {
        throw new NotFoundException('Post not found');
      }

      await this.updatePost(
        {
          commentsCount: (post.commentsCount += 1),
        },
        postId
      );

      return comment;
    } catch {
      throw new BadRequestException('Comment failed');
    }
  }

  async deleteComment(postId: string, commentId: string, userId: string) {
    try {
      const comment = await this.blogRepository.deleteComment(
        commentId,
        userId
      );

      const post = await this.blogRepository.findPostById(postId);

      if (!post) {
        throw new NotFoundException('Post not found');
      }

      await this.updatePost(
        {
          commentsCount: (post.commentsCount -= 1),
        },
        postId,
        userId
      );

      return comment;
    } catch {
      throw new BadRequestException('Delete comment failed');
    }
  }

  async getComments(dto: GetCommentsDto, postId: string) {
    return this.blogRepository.findManyComments(dto, postId);
  }

  async deletePost(postId: string, userId: string) {
    return this.blogRepository.deletePost(postId, userId);
  }
}
