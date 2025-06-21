import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  GetUserRdo,
  HTTP_CLIENT,
  HttpClientImpl,
  SubscribeDto,
  SubscribeRdo,
} from '@project/core';
import {
  GetUserSwaggerDecorator,
  SubscribeSwaggerDecorator,
} from '@project/swagger';

@Controller('user')
export class UserController {
  accountServiceUrl?: string;

  constructor(
    private readonly configService: ConfigService,
    @Inject(HTTP_CLIENT) private readonly httpClient: HttpClientImpl
  ) {
    this.accountServiceUrl = this.configService.get<string>(
      'application.accountServiceUrl'
    );
  }

  @Get(':id')
  @GetUserSwaggerDecorator()
  async getUser(@Param('id') id: string): Promise<GetUserRdo> {
    return this.httpClient.get(`${this.accountServiceUrl}/account/${id}`);
  }

  @Post('subscribe')
  @SubscribeSwaggerDecorator()
  async subscribe(@Body() dto: SubscribeDto): Promise<SubscribeRdo> {
    return this.httpClient.post(
      `${this.accountServiceUrl}/account/subscribe`,
      dto
    );
  }
}
