import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FileEntity } from './entities';
import { Model } from 'mongoose';

@Injectable()
export class FilesStorageRepository {
  constructor(
    @InjectModel(FileEntity.name) private readonly fileModel: Model<FileEntity>
  ) {}

  public async create(item: FileEntity) {
    const file = new this.fileModel(item.toObject());

    return file.save();
  }

  public async findById(id: string) {
    return this.fileModel.findById(id).exec();
  }
}
