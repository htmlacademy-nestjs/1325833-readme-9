import { Injectable } from '@nestjs/common';
import { PostSort, PostStatus, PrismaService } from '@project/core';
import {
  CreateLinkPostDto,
  CreatePhotoPostDto,
  CreateQuotePostDto,
  CreateTextPostDto,
  CreateVideoPostDto,
  GetPostsDto,
  UpdatePostDto,
} from './dto';
import { Prisma } from '@prisma/client';
import { PostMapper } from './mappers';

type CreatePostDto =
  | CreateLinkPostDto
  | CreatePhotoPostDto
  | CreateQuotePostDto
  | CreateTextPostDto
  | CreateVideoPostDto;

@Injectable()
export class PostsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findManyPosts({
    page,
    limit,
    sort,
    type,
    authorId,
    tags,
  }: GetPostsDto) {
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
        authorId,
        type: type as any,
        tags: tags ? { hasSome: tags } : undefined,
        status: PostStatus.PUBLISHED,
      },
      skip: ((page as number) - 1) * (limit as number),
      take: limit,
    });
  }

  async createPost(dto: CreatePostDto, userId: string, withMapper = true) {
    const data = withMapper
      ? PostMapper.toPrisma(dto, userId)
      : (dto as Prisma.PostCreateInput);

    return this.prismaService.post.create({
      data,
    });
  }

  async updatePost(dto: UpdatePostDto, postId: string, userId?: string) {
    return this.prismaService.post.update({
      where: {
        id: postId,
        authorId: userId,
      },
      data: dto,
    });
  }

  async deletePost(postId: string, userId: string) {
    return this.prismaService.post.delete({
      where: {
        id: postId,
        authorId: userId,
      },
    });
  }

  async findDraftsPosts(userId: string) {
    return this.prismaService.post.findMany({
      where: {
        authorId: userId,
        status: PostStatus.DRAFT,
      },
    });
  }

  async findPostById(id: string) {
    return this.prismaService.post.findFirst({
      where: {
        id,
      },
    });
  }

  async createLike(postId: string, userId: string) {
    return this.prismaService.like.create({
      data: {
        postId,
        userId,
      },
    });
  }

  async findLikeByUserAndPostId(postId: string, userId: string) {
    return this.prismaService.like.findFirst({
      where: {
        postId,
        userId,
      },
    });
  }

  async deleteLike(id: string, userId: string) {
    return this.prismaService.like.delete({
      where: {
        id,
        userId,
      },
    });
  }

  async searchPosts(query: string) {
    if (!query.trim()) {
      return [];
    }

    const searchTerms = query
      .trim()
      .split(/\s+/)
      .filter((term) => term.length > 0);

    return this.prismaService.post.findMany({
      where: {
        status: PostStatus.PUBLISHED,
        title: { not: null },
        OR: searchTerms.map((term) => ({
          title: { contains: term, mode: 'insensitive' },
        })),
      },
      take: 20,
    });
  }
}
