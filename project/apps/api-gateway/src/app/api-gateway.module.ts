import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { apiGatewayConfig } from './config';
import { HttpClientProvider, HttpClientInterceptor } from '@project/core';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UserController } from './user.controller';

const ENV_API_GATEWAY_PATH = 'apps/api-gateway/api-gateway.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [apiGatewayConfig],
      envFilePath: ENV_API_GATEWAY_PATH,
    }),
  ],
  controllers: [AuthController, UserController],
  providers: [
    HttpClientProvider,
    { provide: APP_INTERCEPTOR, useClass: HttpClientInterceptor },
  ],
})
export class ApiGatewayModule {}
