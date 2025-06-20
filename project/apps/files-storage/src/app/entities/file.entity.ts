import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface File {
  id?: string;
  originalName: string;
  size: number;
  mimetype: string;
  hashName: string;
  path: string;
  createdAt: Date;
  updatedAt: Date;
}

@Schema({
  collection: 'files',
  timestamps: true,
  _id: true,
})
export class FileEntity extends Document implements File {
  @Prop({
    type: String,
    required: true,
    default: () => uuidv4(),
  })
  override _id: string;

  @Prop({
    required: true,
  })
  originalName: string;

  @Prop({
    required: true,
  })
  hashName: string;

  @Prop({
    required: true,
  })
  mimetype: string;

  @Prop({
    required: true,
  })
  path: string;

  @Prop({
    required: true,
  })
  size: number;

  override id?: string;

  createdAt: Date;

  updatedAt: Date;
}

export const FileSchema = SchemaFactory.createForClass(FileEntity);

FileSchema.virtual('id').get(function () {
  return this._id.toString();
});
