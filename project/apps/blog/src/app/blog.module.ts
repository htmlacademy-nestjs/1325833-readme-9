import { Module } from '@nestjs/common';
import { PostsWithGuardsController } from './posts-with-guards.controller';
import { getJwtConfig, PrismaModule, jwtConfig } from '@project/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { blogConfig } from './config';
import { JwtStrategy } from './strategies';
import { PostsController } from './posts.controller';
import { CommentsController } from './comments.controller';
import { PostsRepository } from './posts.repository';
import { PostsService } from './posts.service';
import { CommentsService } from './comments.service';
import { CommentsRepository } from './comments.repository';

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
  controllers: [PostsWithGuardsController, PostsController, CommentsController],
  providers: [
    JwtStrategy,
    CommentsService,
    CommentsRepository,
    PostsRepository,
    PostsService,
  ],
})
export class BlogModule {}
