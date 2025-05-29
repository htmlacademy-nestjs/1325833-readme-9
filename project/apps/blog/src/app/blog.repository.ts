import { Injectable } from '@nestjs/common';
import { PostSort, PrismaService, PostStatus } from '@project/core';
import { Post, Prisma } from '@prisma/client';
import {
  GetPostsDto,
  CreateLinkPostDto,
  CreatePhotoPostDto,
  CreateQuotePostDto,
  CreateTextPostDto,
  CreateVideoPostDto,
  UpdatePostDto,
  CommentPostDto,
  GetCommentsDto,
  CreateRepostDto,
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

  async findPostById(id: string) {
    return this.prismaService.post.findFirst({
      where: {
        id,
      },
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
