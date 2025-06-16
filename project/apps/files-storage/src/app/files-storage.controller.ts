import { Controller, Get } from '@nestjs/common';
import { FilesStorageService } from './files-storage.service';

@Controller()
export class FilesStorageController {
  constructor(private readonly appService: FilesStorageService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }
}
