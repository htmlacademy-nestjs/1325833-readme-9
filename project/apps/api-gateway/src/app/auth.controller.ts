import {
  Controller,
  Post,
  Inject,
  Body,
  HttpCode,
  HttpStatus,
  Patch,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  UseInterceptors,
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
  UploadedFileRdo,
} from '@project/core';
import { ConfigService } from '@nestjs/config';
import {
  ChangePasswordSwaggerDecorator,
  LoginSwaggerDecorator,
  RefreshSwaggerDecorator,
  RegisterSwaggerDecorator,
  LogoutSwaggerDecorator,
} from '@project/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import FormData from 'form-data';

@Controller('auth')
export class AuthController {
  accountServiceUrl?: string;
  filesStorageServiceUrl?: string;

  constructor(
    private readonly configService: ConfigService,
    @Inject(HTTP_CLIENT) private readonly httpClient: HttpClientImpl
  ) {
    this.accountServiceUrl = this.configService.get<string>(
      'application.accountServiceUrl'
    );
    this.filesStorageServiceUrl = this.configService.get<string>(
      'application.filesStorageServiceUrl'
    );
  }

  @Post('/register')
  @UseInterceptors(FileInterceptor('avatar'))
  @HttpCode(HttpStatus.CREATED)
  @RegisterSwaggerDecorator()
  async register(
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [
          new MaxFileSizeValidator({ maxSize: 500 * 1024 }), // 500kb
        ],
      })
    )
    avatar: Express.Multer.File | undefined,
    @Body() dto: Omit<CreateUserDto, 'avatar'>
  ): Promise<RegisterRdo> {
    let avatarUrl = undefined;

    if (avatar) {
      const form = new FormData();

      form.append('file', avatar.buffer, {
        filename: avatar.originalname,
        contentType: avatar.mimetype,
      });

      const headers = form.getHeaders();
      const uploadFileResponse: UploadedFileRdo = await this.httpClient.post(
        `${this.filesStorageServiceUrl}/api/files/upload`,
        form,
        { headers }
      );

      avatarUrl = `${this.filesStorageServiceUrl}${uploadFileResponse.path}`;
    }

    return this.httpClient.post(`${this.accountServiceUrl}/account/register`, {
      ...dto,
      avatar: avatarUrl,
    });
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
