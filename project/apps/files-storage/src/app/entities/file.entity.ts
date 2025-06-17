import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export interface File {
  id?: string;
  originalName: string;
  subDirectory: string;
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
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class FileEntity extends Document implements File {
  @Prop({
    required: true,
  })
  public originalName: string;

  @Prop({
    required: true,
  })
  public hashName: string;

  @Prop({
    required: true,
  })
  public subDirectory: string;

  @Prop({
    required: true,
  })
  public mimetype: string;

  @Prop({
    required: true,
  })
  public path: string;

  @Prop({
    required: true,
  })
  public size: number;

  public override id?: string;

  public createdAt: Date;

  public updatedAt: Date;
}

export const FileSchema = SchemaFactory.createForClass(FileEntity);

FileSchema.virtual('id').get(function () {
  return this._id?.toString();
});
