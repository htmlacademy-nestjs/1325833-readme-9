import 'multer';
import { type Express } from 'express';
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesStorageService } from './files-storage.service';
import { ApiTags } from '@nestjs/swagger';
import { UploadedFileRdo } from '@project/core';
import { UploadFileSwaggerDecorator } from '@project/swagger';

@ApiTags('Files')
@Controller('files')
export class FilesStorageController {
  constructor(private readonly filesStorageService: FilesStorageService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(HttpStatus.CREATED)
  @UploadFileSwaggerDecorator()
  public async uploadFile(
    @UploadedFile()
    file: Express.Multer.File
  ): Promise<UploadedFileRdo> {
    return this.filesStorageService.saveFile(file);
  }
}
