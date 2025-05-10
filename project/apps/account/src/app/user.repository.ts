import { Injectable } from '@nestjs/common';
import { User } from '@project/core';
import * as crypto from 'node:crypto';

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

  async updateUser(dto: Omit<Partial<User>, 'id'>, userId: string) {
    return (this.users = this.users.map((user) => user));
  }
}
