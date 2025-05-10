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

export type PublicUser = Pick<
  User,
  'id' | 'subscribersCount' | 'postsCount' | 'registrationDate'
>;

export interface CurrentUserInterface {
  id: string;
  email: string;
  username: string;
}
