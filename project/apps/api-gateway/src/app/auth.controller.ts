import { Controller, Post, Inject, Body } from '@nestjs/common';
import {
  HTTP_CLIENT,
  HttpClientImpl,
  CreateUserDto,
  LoginUserDto,
} from '@project/core';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  accountServiceUrl?: string;

  constructor(
    private readonly configService: ConfigService,
    @Inject(HTTP_CLIENT) private readonly httpClient: HttpClientImpl
  ) {
    this.accountServiceUrl = this.configService.get<string>(
      'application.accountServiceUrl'
    );
  }

  @Post('/register')
  async register(@Body() dto: CreateUserDto) {
    return this.httpClient.post(
      `${this.accountServiceUrl}/account/register`,
      dto
    );
  }

  @Post('/login')
  async login(@Body() dto: LoginUserDto) {
    return this.httpClient.post(`${this.accountServiceUrl}/account/login`, dto);
  }
}
