import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import {
  CreateLinkPostDto,
  CreatePhotoPostDto,
  CreateQuotePostDto,
  CreateTextPostDto,
  CreateVideoPostDto,
  GetPostsDto,
  UpdatePostDto,
} from './dto';
import { BlogExceptions } from './constants';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  async createVideoPost(dto: CreateVideoPostDto, userId: string) {
    return this.postsRepository.createPost(dto, userId);
  }

  async createTextPost(dto: CreateTextPostDto, userId: string) {
    return this.postsRepository.createPost(dto, userId);
  }

  async createQuotePost(dto: CreateQuotePostDto, userId: string) {
    return this.postsRepository.createPost(dto, userId);
  }

  async createPhotoPost(dto: CreatePhotoPostDto, userId: string) {
    return this.postsRepository.createPost(dto, userId);
  }

  async createLinkPost(dto: CreateLinkPostDto, userId: string) {
    return this.postsRepository.createPost(dto, userId);
  }

  async getPosts(dto: GetPostsDto) {
    return this.postsRepository.findManyPosts(dto);
  }

  async getMyDrafts(userId: string) {
    return this.postsRepository.findDraftsPosts(userId);
  }

  async getPostById(id: string) {
    return this.postsRepository.findPostById(id);
  }

  async repostPost(postId: string, userId: string) {
    const originalPost = await this.postsRepository.findPostById(postId);

    if (!originalPost) {
      throw new NotFoundException(BlogExceptions.ORIGINAL_POST_NOT_FOUND);
    }

    if (originalPost.isRepost) {
      throw new ConflictException(BlogExceptions.REPOST_CANT_REPOST);
    }

    const { id, ...restOriginalPost } = originalPost;

    return this.postsRepository.createPost(
      {
        ...restOriginalPost,
        originalPostAuthorId: originalPost.authorId,
        originalPostId: postId,
        publishedAt: new Date(),
        isRepost: true,
        likesCount: 0,
        commentsCount: 0,
      } as any,
      userId,
      false
    );
  }

  async updatePost(dto: UpdatePostDto, postId: string, userId?: string) {
    return this.postsRepository.updatePost(dto, postId, userId);
  }

  async deletePost(postId: string, userId: string) {
    return this.postsRepository.deletePost(postId, userId);
  }

  async searchPosts(query: string) {
    return this.postsRepository.searchPosts(query);
  }

  async likePost(postId: string, userId: string) {
    try {
      const existingLike = await this.postsRepository.findLikeByUserAndPostId(
        postId,
        userId
      );

      const like = existingLike
        ? await this.postsRepository.deleteLike(existingLike.id, userId)
        : await this.postsRepository.createLike(postId, userId);

      const post = await this.postsRepository.findPostById(postId);

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
}
