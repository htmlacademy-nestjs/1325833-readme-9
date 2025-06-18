import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '@project/core';
import { Document, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema({
  collection: 'accounts',
  timestamps: true,
  _id: true,
})
export class UserEntity extends Document implements Omit<User, 'id'> {
  @Prop({
    type: String,
    required: true,
    default: () => uuidv4(),
  })
  override _id: string;

  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  username: string;

  @Prop({
    required: true,
  })
  passwordHash: string;

  @Prop({
    required: true,
  })
  registrationDate: Date;

  @Prop({
    type: Array<string>,
    default: () => [],
  })
  subscribers: string[];

  @Prop({
    required: true,
  })
  postsCount: number;

  @Prop({
    type: String,
    default: null,
  })
  refreshTokenId: string;

  @Prop()
  avatar?: string;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
