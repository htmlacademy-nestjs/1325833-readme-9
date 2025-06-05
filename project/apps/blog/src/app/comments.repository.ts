import { Injectable } from '@nestjs/common';
import { PrismaService } from '@project/core';
import { CommentPostDto, GetCommentsDto } from './dto';

@Injectable()
export class CommentsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createComment(dto: CommentPostDto, postId: string, userId: string) {
    return this.prismaService.comment.create({
      data: {
        ...dto,
        postId,
        authorId: userId,
      },
    });
  }

  async deleteComment(id: string, userId: string) {
    return this.prismaService.comment.delete({
      where: { id, authorId: userId },
    });
  }

  async findManyComments({ page, limit }: GetCommentsDto, postId: string) {
    return this.prismaService.comment.findMany({
      where: {
        postId,
      },
      skip: ((page as number) - 1) * (limit as number),
      take: limit,
    });
  }
}
