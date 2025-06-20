import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';
import { FilesStorageRepository } from './files-storage.repository';
import { UploadedFileRdo } from '@project/core';

@Injectable()
export class FilesStorageService {
  constructor(
    private readonly filesStorageRepository: FilesStorageRepository,
    private readonly configService: ConfigService
  ) {}

  async saveFile(file: Express.Multer.File): Promise<UploadedFileRdo> {
    const uploadDirectory = this.configService.get<string>(
      'application.uploadDirectory'
    ) as string;
    const serveRoot = this.configService.get<string>('application.serveRoot');

    const hash = uuidv4();
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
      path: `${serveRoot}/${hashName}`,
      size: file.size,
    });

    return {
      id: savedFile.id,
      path: savedFile.path,
      originalName: savedFile.originalName,
      size: savedFile.size,
    };
  }
}
