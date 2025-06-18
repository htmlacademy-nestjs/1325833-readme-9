import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FileEntity } from './entities';
import { Model } from 'mongoose';

@Injectable()
export class FilesStorageRepository {
  constructor(
    @InjectModel(FileEntity.name) private readonly fileModel: Model<FileEntity>
  ) {}

  async create(data: Partial<FileEntity>) {
    const file = new this.fileModel(data);

    return file.save();
  }

  async findById(id: string) {
    return this.fileModel.findById(id).exec();
  }
}
