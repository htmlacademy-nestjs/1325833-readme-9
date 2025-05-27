import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import {
  getJwtConfig,
  JwtStrategy,
  PrismaModule,
  jwtConfig,
} from '@project/core';
import { BlogRepository } from './blog.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { blogConfig } from './config';

const ENV_BLOG_FILE_PATH = 'apps/blog/blog.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [jwtConfig, blogConfig],
      envFilePath: ENV_BLOG_FILE_PATH,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
    PrismaModule,
  ],
  controllers: [BlogController],
  providers: [JwtStrategy, BlogService, BlogRepository],
})
export class BlogModule {}
