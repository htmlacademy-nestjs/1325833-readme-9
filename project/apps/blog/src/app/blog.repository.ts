import { Injectable } from '@nestjs/common';
import { PostSort, PostType, PrismaService } from '@project/core';
import { PostStatus, Prisma } from '@prisma/client';

@Injectable()
export class BlogRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getPosts(
    page: number,
    limit: number,
    sort: PostSort,
    type?: PostType,
    userId?: string,
    tags?: string[]
  ) {
    let orderBy: Prisma.PostOrderByWithRelationInput;

    switch (sort) {
      case PostSort.LIKES:
        orderBy = { likesCount: 'desc' };
        break;
      case PostSort.COMMENTS:
        orderBy = { commentsCount: 'desc' };
        break;
      default:
        orderBy = { publishedAt: 'desc' };
    }

    return this.prismaService.post.findMany({
      orderBy,
      where: {
        type: type as any,
        authorId: userId,
        tags: tags ? { hasSome: tags } : undefined,
        status: PostStatus.PUBLISHED,
      },
      skip: (page - 1) * limit,
      take: limit,
    });
  }
}
