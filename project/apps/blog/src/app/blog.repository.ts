import { Injectable } from '@nestjs/common';
import { PostSort, PrismaService } from '@project/core';
import { PostStatus, Prisma } from '@prisma/client';
import {
  GetPostsDto,
  CreateLinkPostDto,
  CreatePhotoPostDto,
  CreateQuotePostDto,
  CreateTextPostDto,
  CreateVideoPostDto,
} from './dto';
import { PostMapper } from './mappers';

type CreatePostDto =
  | CreateLinkPostDto
  | CreatePhotoPostDto
  | CreateQuotePostDto
  | CreateTextPostDto
  | CreateVideoPostDto;

@Injectable()
export class BlogRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findMany({ page, limit, sort, type, userId, tags }: GetPostsDto) {
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

  async create(dto: CreatePostDto, userId: string) {
    const data = PostMapper.toPrisma(dto, userId);

    return this.prismaService.post.create({
      data,
    });
  }
}
