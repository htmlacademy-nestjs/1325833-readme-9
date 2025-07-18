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

  async create(user: Omit<User, 'id' | 'subscribers'>): Promise<UserEntity> {
    const newUser = await new this.userModel(user).save();

    return newUser.toObject();
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.userModel.findOne({ email }).lean().exec();
  }

  async findById(id: string): Promise<UserEntity | null> {
    return this.userModel.findOne({ _id: id }).lean().exec();
  }

  async update(
    dto: Omit<Partial<User>, 'id'>,
    id: string
  ): Promise<BaseResponse> {
    try {
      await this.userModel.findByIdAndUpdate(id, dto, { new: true }).exec();

      return { isSuccess: true };
    } catch {
      return { isSuccess: false };
    }
  }

  async updateRefreshTokenId(
    userId: string,
    refreshTokenId: string | null
  ): Promise<void> {
    await this.userModel
      .findByIdAndUpdate(userId, { refreshTokenId }, { new: true })
      .exec();
  }
}
