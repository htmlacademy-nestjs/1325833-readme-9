import {
  Controller,
  Post,
  Inject,
  Body,
  HttpCode,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import {
  HTTP_CLIENT,
  HttpClientImpl,
  CreateUserDto,
  LoginUserDto,
  RegisterRdo,
  LoginRdo,
  ChangeUserPasswordDto,
  ChangePasswordRdo,
  RefreshTokenDto,
  RefreshRdo,
} from '@project/core';
import { ConfigService } from '@nestjs/config';
import {
  ChangePasswordSwaggerDecorator,
  LoginSwaggerDecorator,
  RefreshSwaggerDecorator,
  RegisterSwaggerDecorator,
  LogoutSwaggerDecorator,
} from '@project/swagger';

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
  @HttpCode(HttpStatus.CREATED)
  @RegisterSwaggerDecorator()
  async register(@Body() dto: CreateUserDto): Promise<RegisterRdo> {
    return this.httpClient.post(
      `${this.accountServiceUrl}/account/register`,
      dto
    );
  }

  @Post('/login')
  @LoginSwaggerDecorator()
  async login(@Body() dto: LoginUserDto): Promise<LoginRdo> {
    return this.httpClient.post(`${this.accountServiceUrl}/account/login`, dto);
  }

  @Patch('change-password')
  @ChangePasswordSwaggerDecorator()
  async changePassword(
    @Body() dto: ChangeUserPasswordDto
  ): Promise<ChangePasswordRdo> {
    return this.httpClient.patch(
      `${this.accountServiceUrl}/account/change-password`,
      dto
    );
  }

  @Post('refresh')
  @RefreshSwaggerDecorator()
  async refreshTokens(@Body() dto: RefreshTokenDto): Promise<RefreshRdo> {
    return this.httpClient.post(
      `${this.accountServiceUrl}/account/refresh`,
      dto
    );
  }

  @Post('logout')
  @LogoutSwaggerDecorator()
  async logout(): Promise<void> {
    return this.httpClient.post(
      `${this.accountServiceUrl}/account/logout`,
      null
    );
  }
}
