import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { filesStorageConfig } from './config';
import { FilesStorageService } from './files-storage.service';
import { FilesStorageRepository } from './files-storage.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongooseOptions } from './mongo';
import { FileEntity, FileSchema } from './entities';

const ENV_FILE_PATH = 'apps/files-storage/files-storage.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [filesStorageConfig],
      envFilePath: ENV_FILE_PATH,
    }),
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => [
        {
          rootPath: config.get<string>('application.uploadDirectory'),
          serveRoot: config.get<string>('application.serveRoot'),
        },
      ],
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync(getMongooseOptions()),
    MongooseModule.forFeature([{ name: FileEntity.name, schema: FileSchema }]),
  ],
  providers: [FilesStorageService, FilesStorageRepository, ConfigService],
})
export class FilesStorageModule {}
