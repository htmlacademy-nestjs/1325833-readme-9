import { Injectable } from '@nestjs/common';
import { PostSort, PrismaService } from '@project/core';
import { PostStatus, Prisma } from '@prisma/client';
import { GetPostsDto } from './dto';

@Injectable()
export class BlogRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getPosts({ page, limit, sort, type, userId, tags }: GetPostsDto) {
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
      skip: ((page as number) - 1) * (limit as number),
      take: limit,
    });
  }
}
