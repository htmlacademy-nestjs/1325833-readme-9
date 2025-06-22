export interface User {
  id: string;
  email: string;
  username: string;
  passwordHash: string;
  registrationDate: Date;
  subscribers: string[];
  postsCount: number;
  refreshTokenId: string | null;
  avatar?: string;
}

export interface AuthUser {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
}

export interface PublicUser {
  id: User['id'];
  subscribersCount: number;
  postsCount: User['postsCount'];
  registrationDate: User['registrationDate'];
}

export interface CurrentUserInterface {
  id: string;
  email: string;
  username: string;
}

export enum UserPostsCountUpdateType {
  INCREMENT = 'increment',
  DECREMENT = 'decrement',
}
