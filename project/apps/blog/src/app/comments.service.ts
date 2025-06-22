import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CommentPostDto, GetCommentsDto, PostStatus } from '@project/core';
import { CommentsRepository } from './comments.repository';
import { PostsRepository } from './posts.repository';
import { PostsService } from './posts.service';
import { BlogExceptions } from './constants';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentsRepository: CommentsRepository,
    private readonly postsRepository: PostsRepository,
    private readonly postsService: PostsService
  ) {}

  async commentPost(dto: CommentPostDto, postId: string, userId: string) {
    try {
      const post = await this.postsRepository.findPostById(postId);

      if (!post) {
        throw new NotFoundException(BlogExceptions.POST_NOT_FOUND);
      }

      if (post.status !== PostStatus.PUBLISHED) {
        throw new NotFoundException(BlogExceptions.CANT_LIKE_UNPUBLISHED_POST);
      }

      const comment = await this.commentsRepository.createComment(
        dto,
        postId,
        userId
      );

      await this.postsService.updatePost(
        {
          commentsCount: (post.commentsCount += 1),
        },
        postId
      );

      return comment;
    } catch {
      throw new BadRequestException(
        BlogExceptions.CREATE_COMMENT_ACTION_FAILED
      );
    }
  }

  async deleteComment(postId: string, commentId: string, userId: string) {
    try {
      const post = await this.postsRepository.findPostById(postId);

      if (!post) {
        throw new NotFoundException(BlogExceptions.POST_NOT_FOUND);
      }

      const existingComment = await this.commentsRepository.getCommentById(
        commentId
      );

      if (!existingComment) {
        throw new NotFoundException(BlogExceptions.COMMENT_NOT_FOUND);
      }

      if (existingComment.authorId !== userId) {
        throw new BadRequestException(
          BlogExceptions.USER_CANT_DELETE_SOMEONE_ELSE_COMMENT
        );
      }

      const comment = await this.commentsRepository.deleteComment(
        commentId,
        userId
      );

      await this.postsService.updatePost(
        {
          commentsCount: (post.commentsCount -= 1),
        },
        postId,
        userId
      );

      return comment;
    } catch {
      throw new BadRequestException(
        BlogExceptions.DELETE_COMMENT_ACTION_FAILED
      );
    }
  }

  async getComments(dto: GetCommentsDto, postId: string) {
    const post = await this.postsRepository.findPostById(postId);

    if (!post) {
      throw new NotFoundException(BlogExceptions.POST_NOT_FOUND);
    }

    return this.commentsRepository.findManyComments(dto, postId);
  }
}
