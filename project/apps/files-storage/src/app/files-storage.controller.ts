import 'multer';
import { type Express } from 'express';
import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesStorageService } from './files-storage.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Files')
@Controller('files')
export class FilesStorageController {
  constructor(private readonly filesStorageService: FilesStorageService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }), // 10MB
        ],
      })
    )
    file: Express.Multer.File
  ) {
    return this.filesStorageService.saveFile(file);
  }

  @Get(':id')
  async show(@Param('id') id: string) {
    return this.filesStorageService.getFile(id);
  }
}
