import { Module } from '@nestjs/common';
import { NotifyController } from './notify.controller';
import { NotifyService } from './notify.service';
import { ConfigModule } from '@nestjs/config';
import { notifyConfig } from './config';

const ENV_BLOG_FILE_PATH = 'apps/notify/notify.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [notifyConfig],
      envFilePath: ENV_BLOG_FILE_PATH,
    }),
  ],
  controllers: [NotifyController],
  providers: [NotifyService],
})
export class NotifyModule {}
