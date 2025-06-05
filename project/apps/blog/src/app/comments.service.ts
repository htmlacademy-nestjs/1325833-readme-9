import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CommentPostDto, GetCommentsDto } from './dto';
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

      const comment = await this.commentsRepository.deleteComment(
        commentId,
        userId
      );

      if (!comment) {
        throw new NotFoundException(BlogExceptions.COMMENT_NOT_FOUND);
      }

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
