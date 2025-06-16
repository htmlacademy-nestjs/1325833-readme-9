import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { filesStorageConfig } from './config';

const ENV_FILE_PATH = 'apps/files-storage/files-storage.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [filesStorageConfig],
      envFilePath: ENV_FILE_PATH,
    }),
  ],
})
export class FilesStorageModule {}
