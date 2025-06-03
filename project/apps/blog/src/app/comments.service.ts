import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CommentPostDto, GetCommentsDto } from './dto';
import { CommentsRepository } from './comments.repository';
import { PostsRepository } from './posts.repository';
import { PostsService } from './posts.service';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentsRepository: CommentsRepository,
    private readonly postsRepository: PostsRepository,
    private readonly postsService: PostsService
  ) {}

  async commentPost(dto: CommentPostDto, postId: string, userId: string) {
    try {
      const comment = await this.commentsRepository.createComment(
        dto,
        postId,
        userId
      );

      const post = await this.postsRepository.findPostById(postId);

      if (!post) {
        throw new NotFoundException('Post not found');
      }

      await this.postsService.updatePost(
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
      const comment = await this.commentsRepository.deleteComment(
        commentId,
        userId
      );

      const post = await this.postsRepository.findPostById(postId);

      if (!post) {
        throw new NotFoundException('Post not found');
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
      throw new BadRequestException('Delete comment failed');
    }
  }

  async getComments(dto: GetCommentsDto, postId: string) {
    return this.commentsRepository.findManyComments(dto, postId);
  }
}
