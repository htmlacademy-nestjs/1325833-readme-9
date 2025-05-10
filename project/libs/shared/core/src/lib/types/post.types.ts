export type PostType = 'video' | 'text' | 'quote' | 'photo' | 'link';

export type PostStatus = 'published' | 'draft';

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
  originalPostId?: string;
  tags?: string[];
}

export interface VideoPost extends BasePost {
  type: 'video';
  title: string;
  videoUrl: string;
}

export interface TextPost extends BasePost {
  type: 'text';
  title: string;
  preview: string;
  content: string;
}

export interface QuotePost extends BasePost {
  type: 'quote';
  author: string;
  content: string;
}

export interface PhotoPost extends BasePost {
  type: 'photo';
  photo: string;
}

export interface LinkPost extends BasePost {
  type: 'link';
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
