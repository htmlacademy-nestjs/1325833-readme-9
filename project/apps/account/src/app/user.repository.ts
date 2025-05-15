import { Injectable } from '@nestjs/common';
import { BaseResponse, User } from '@project/core';
import { InjectModel } from '@nestjs/mongoose';
import { UserEntity } from './entities';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(UserEntity.name) private readonly userModel: Model<UserEntity>
  ) {}

  async create(user: Omit<User, 'id'>): Promise<UserEntity> {
    const newUser = new this.userModel(user);

    return newUser.save();
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.userModel.findOne({ email }).lean().exec();
  }

  async findById(id: string): Promise<UserEntity | null> {
    console.log(321, id);
    return this.userModel.findOne({ _id: id }).lean().exec();
  }

  async update(
    dto: Omit<Partial<User>, 'id'>,
    id: string
  ): Promise<BaseResponse> {
    let isUpdated = false;

    try {
      await this.userModel.findByIdAndUpdate(id, dto, { new: true }).exec();

      isUpdated = true;
    } catch {
      // ignore
    }

    return { isSuccess: isUpdated };
  }
}
