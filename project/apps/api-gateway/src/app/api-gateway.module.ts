import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { apiGatewayConfig } from './config';
import {
  HttpClientProvider,
  HttpClientInterceptor,
  getRabbitMqOptions,
  getJwtConfig,
  jwtConfig,
} from '@project/core';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { JwtStrategy } from './strategies';
import { UserController } from './user.controller';
import { PostController } from './post.controller';
import { LikeController } from './like.controller';
import { CommentController } from './comment.controller';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { JwtModule } from '@nestjs/jwt';

const ENV_API_GATEWAY_PATH = 'apps/api-gateway/api-gateway.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [apiGatewayConfig, jwtConfig],
      envFilePath: ENV_API_GATEWAY_PATH,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMqOptions('application.rabbit')
    ),
  ],
  controllers: [
    AuthController,
    UserController,
    PostController,
    LikeController,
    CommentController,
  ],
  providers: [
    JwtStrategy,
    HttpClientProvider,
    { provide: APP_INTERCEPTOR, useClass: HttpClientInterceptor },
  ],
})
export class ApiGatewayModule {}
