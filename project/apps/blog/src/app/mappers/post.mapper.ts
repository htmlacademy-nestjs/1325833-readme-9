import { Prisma, PostType as PrismaPostType, PostStatus } from '@prisma/client';

import {
  CreateLinkPostDto,
  CreatePhotoPostDto,
  CreateQuotePostDto,
  CreateTextPostDto,
  CreateVideoPostDto,
} from '../dto';
import { PostType } from '@project/core';

type CreatePostDto =
  | CreateLinkPostDto
  | CreatePhotoPostDto
  | CreateQuotePostDto
  | CreateTextPostDto
  | CreateVideoPostDto;

export class PostMapper {
  static toPrisma(dto: CreatePostDto, userId: string): Prisma.PostCreateInput {
    return {
      type: dto.type as unknown as PrismaPostType,
      status: dto.status as unknown as PostStatus,
      tags: dto.tags,
      authorId: userId,
      publishedAt: new Date(),
      ...this.getTypeSpecificFields(dto),
    };
  }

  private static getTypeSpecificFields(dto: CreatePostDto) {
    switch (dto.type) {
      case PostType.VIDEO:
        return { title: dto.title, videoUrl: dto.videoUrl };
      case PostType.TEXT:
        return { title: dto.title, preview: dto.preview, content: dto.content };
      case PostType.QUOTE:
        return { quoteText: dto.quoteText, quoteAuthor: dto.quoteAuthor };
      case PostType.PHOTO:
        return { photoUrl: dto.photoUrl };
      case PostType.LINK:
        return { link: dto.link, description: dto.description };
    }
  }
}
