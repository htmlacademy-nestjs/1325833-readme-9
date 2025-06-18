import { Module } from '@nestjs/common';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import { notifyConfig } from './config';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMqOptions } from '@project/core';

const ENV_BLOG_FILE_PATH = 'apps/notify/notify.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [notifyConfig],
      envFilePath: ENV_BLOG_FILE_PATH,
    }),
    EmailModule,
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMqOptions('application.rabbit')
    ),
  ],
})
export class NotifyModule {}
