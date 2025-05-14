import { Injectable } from '@nestjs/common';
import { BaseResponse, User } from '@project/core';
import * as crypto from 'node:crypto';
import { ChangePasswordRdo } from './rdo';

@Injectable()
export class UserRepository {
  private users: User[] = [];

  async create(user: Omit<User, 'id'>): Promise<User> {
    const newUser = { ...user, id: crypto.randomUUID() };

    this.users.push(newUser);

    return newUser;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) || null;
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) || null;
  }

  async update(
    dto: Omit<Partial<User>, 'id'>,
    id: string
  ): Promise<BaseResponse> {
    let isUpdated = false;

    this.users = this.users.map((user) => {
      if (user.id === id) {
        isUpdated = true;

        return { ...user, ...dto };
      }

      return user;
    });

    return { isSuccess: isUpdated };
  }
}
