export enum PostType {
  VIDEO = 'video',
  TEXT = 'text',
  QUOTE = 'quote',
  PHOTO = 'photo',
  LINK = 'link',
}

export enum PostStatus {
  PUBLISHED = 'published',
  DRAFT = 'draft',
}

export interface BasePost {
  id: string;
  authorId: string;
  createdAt: Date;
  publishedAt: Date;
  status: PostStatus;
  isRepost: boolean;
  type: PostType;
  likesCount: number;
  commentsCount: number;
  tags: string[];
  originalPostId?: string;
  originalPostAuthorId?: string;
}

export interface VideoPost extends BasePost {
  type: PostType.VIDEO;
  title: string;
  videoUrl: string;
}

export interface TextPost extends BasePost {
  type: PostType.TEXT;
  title: string;
  preview: string;
  content: string;
}

export interface QuotePost extends BasePost {
  type: PostType.QUOTE;
  quoteAuthor: string;
  content: string;
}

export interface PhotoPost extends BasePost {
  type: PostType.PHOTO;
  photo: string;
}

export interface LinkPost extends BasePost {
  type: PostType.LINK;
  link: string;
  description?: string;
}

export type Post = VideoPost | TextPost | QuotePost | PhotoPost | LinkPost;

export interface PostComment {
  id: string;
  postId: string;
  authorId: string;
  text: string;
  createdAt: Date;
}

export interface PostLike {
  id: string;
  postId: string;
  userId: string;
  createdAt: Date;
}
