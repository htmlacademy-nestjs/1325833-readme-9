import { Injectable, NotFoundException } from '@nestjs/common';
import * as crypto from 'crypto';
import * as path from 'path';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';
import { FilesStorageRepository } from './files-storage.repository';
import { FilesStorageExceptions } from './constants';

@Injectable()
export class FilesStorageService {
  constructor(
    private readonly filesStorageRepository: FilesStorageRepository,
    private readonly configService: ConfigService
  ) {}

  async saveFile(file: Express.Multer.File) {
    const uploadDirectory = this.configService.get<string>(
      'application.uploadDirectory'
    ) as string;
    const serveRoot = this.configService.get<string>('application.serveRoot');

    const hash = crypto.createHash('sha256').update(file.buffer).digest('hex');
    const fileExtension = path.extname(file.originalname);
    const hashName = `${hash}${fileExtension}`;

    const targetDirectory = path.join(uploadDirectory);

    if (!fs.existsSync(targetDirectory)) {
      fs.mkdirSync(targetDirectory, { recursive: true });
    }

    const filePath = path.join(targetDirectory, hashName);

    fs.writeFileSync(filePath, file.buffer);

    const savedFile = await this.filesStorageRepository.create({
      originalName: file.originalname,
      hashName,
      mimetype: file.mimetype,
      path: filePath,
      size: file.size,
    });

    return {
      id: savedFile.id,
      url: path,
      originalName: savedFile.originalName,
      size: savedFile.size,
    };
  }

  async getFile(id: string) {
    const existingFile = await this.filesStorageRepository.findById(id);

    if (!existingFile) {
      throw new NotFoundException(FilesStorageExceptions.FILE_NOT_FOUND);
    }

    return existingFile;
  }
}
