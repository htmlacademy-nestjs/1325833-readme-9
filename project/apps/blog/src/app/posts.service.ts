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
import {
  CommonPostRdo,
  CreateLinkPostRdo,
  CreatePhotoPostRdo,
  CreateQuotePostRdo,
  CreateTextPostRdo,
  CreateVideoPostRdo,
} from './rdo';
import { PostStatus, PostType } from '@project/core';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  async createVideoPost(
    dto: CreateVideoPostDto,
    userId: string
  ): Promise<CreateVideoPostRdo> {
    const response = await this.postsRepository.createPost(dto, userId);

    return {
      ...response,
      type: PostType.VIDEO,
      status: PostStatus.DRAFT,
      title: response.title as string,
      videoUrl: response.videoUrl as string,
    };
  }

  async createTextPost(
    dto: CreateTextPostDto,
    userId: string
  ): Promise<CreateTextPostRdo> {
    const response = await this.postsRepository.createPost(dto, userId);

    return {
      ...response,
      type: PostType.TEXT,
      status: PostStatus.DRAFT,
      preview: response.preview as string,
      title: response.title as string,
      content: response.content as string,
    };
  }

  async createQuotePost(
    dto: CreateQuotePostDto,
    userId: string
  ): Promise<CreateQuotePostRdo> {
    const response = await this.postsRepository.createPost(dto, userId);

    return {
      ...response,
      type: PostType.QUOTE,
      status: PostStatus.DRAFT,
      quoteText: response.quoteText as string,
      quoteAuthor: response.quoteAuthor as string,
    };
  }

  async createPhotoPost(
    dto: CreatePhotoPostDto,
    userId: string
  ): Promise<CreatePhotoPostRdo> {
    const response = await this.postsRepository.createPost(dto, userId);

    return {
      ...response,
      type: PostType.PHOTO,
      status: PostStatus.DRAFT,
      photoUrl: response.photoUrl as string,
    };
  }

  async createLinkPost(
    dto: CreateLinkPostDto,
    userId: string
  ): Promise<CreateLinkPostRdo> {
    const response = await this.postsRepository.createPost(dto, userId);

    return {
      ...response,
      type: PostType.LINK,
      status: PostStatus.DRAFT,
      link: response.link as string,
      description: response.description as string,
    };
  }

  async getPosts(dto: GetPostsDto) {
    return this.postsRepository.findManyPosts(dto);
  }

  async getMyDrafts(userId: string): Promise<CommonPostRdo[]> {
    return (await this.postsRepository.findDraftsPosts(
      userId
    )) as unknown as CommonPostRdo[];
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

  async updatePost(
    dto: UpdatePostDto,
    postId: string,
    userId?: string
  ): Promise<CommonPostRdo> {
    const post = await this.postsRepository.findPostById(postId);

    if (!post) {
      throw new NotFoundException(BlogExceptions.POST_NOT_FOUND);
    }

    return (await this.postsRepository.updatePost(
      dto,
      postId,
      userId
    )) as unknown as CommonPostRdo;
  }

  async deletePost(postId: string, userId: string) {
    const post = await this.postsRepository.findPostById(postId);

    if (!post) {
      throw new NotFoundException(BlogExceptions.POST_NOT_FOUND);
    }

    return this.postsRepository.deletePost(postId, userId);
  }

  async searchPosts(query: string) {
    return this.postsRepository.searchPosts(query);
  }

  async likePost(postId: string, userId: string) {
    try {
      const post = await this.postsRepository.findPostById(postId);

      if (!post) {
        throw new NotFoundException(BlogExceptions.POST_NOT_FOUND);
      }

      const existingLike = await this.postsRepository.findLikeByUserAndPostId(
        postId,
        userId
      );

      const like = existingLike
        ? await this.postsRepository.deleteLike(existingLike.id, userId)
        : await this.postsRepository.createLike(postId, userId);

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
      throw new BadRequestException(BlogExceptions.LIKE_ACTION_FAILED);
    }
  }
}
