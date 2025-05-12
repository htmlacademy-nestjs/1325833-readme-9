import { User } from '../types';

export class UserEntity implements User {
  id: string;
  email: string;
  username: string;
  passwordHash: string;
  registrationDate: Date;
  subscribersCount: number;
  postsCount: number;
  avatar?: string | undefined;
}
