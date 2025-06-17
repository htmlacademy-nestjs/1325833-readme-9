import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as path from 'path';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';
import { FilesStorageRepository } from './files-storage.repository';
import { FileEntity } from './entities';

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

    const subDirectory = hash.substring(0, 2);
    const targetDirectory = path.join(uploadDirectory, subDirectory);

    if (!fs.existsSync(targetDirectory)) {
      fs.mkdirSync(targetDirectory, { recursive: true });
    }

    const filePath = path.join(targetDirectory, hashName);

    fs.writeFileSync(filePath, file.buffer);

    const fileEntity = new FileEntity({
      originalName: file.originalname,
      hashName,
      subDirectory,
      mimetype: file.mimetype,
      path: filePath,
      size: file.size,
    });

    const savedFile = await this.filesStorageRepository.create(fileEntity);

    return {
      id: savedFile.id,
      url: `${serveRoot}/${subDirectory}/${hashName}`,
      originalName: savedFile.originalName,
      size: savedFile.size,
    };
  }

  async getFile(id: string) {
    return this.filesStorageRepository.findById(id);
  }
}
