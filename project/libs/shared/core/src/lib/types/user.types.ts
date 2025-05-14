export interface User {
  id: string;
  email: string;
  username: string;
  passwordHash: string;
  registrationDate: Date;
  subscribersCount: number;
  postsCount: number;
  avatar?: string;
}

export interface PublicUser {
  id: User['id'];
  subscribersCount: User['subscribersCount'];
  postsCount: User['postsCount'];
  registrationDate: User['registrationDate'];
}

export interface CurrentUserInterface {
  email: string;
  username: string;
}
