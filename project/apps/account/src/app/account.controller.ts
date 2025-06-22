import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Param,
  UseGuards,
  Post,
  Body,
  Patch,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AccountService } from './account.service';
import {
  CurrentUser,
  JwtAuthGuard,
  CreateUserDto,
  LoginUserDto,
  ChangeUserPasswordDto,
  RefreshTokenDto,
  SubscribeDto,
  ChangePasswordRdo,
  GetUserRdo,
  LoginRdo,
  RegisterRdo,
  RefreshRdo,
  SubscribeRdo,
  GetUserFullInfoRdo,
  BaseResponse,
  UpdatePostsCountDto,
} from '@project/core';
import {
  RegisterSwaggerDecorator,
  LoginSwaggerDecorator,
  GetUserSwaggerDecorator,
  ChangePasswordSwaggerDecorator,
  RefreshSwaggerDecorator,
  LogoutSwaggerDecorator,
  SubscribeSwaggerDecorator,
  GetUserFullInfoSwaggerDecorator,
} from '@project/swagger';

@ApiTags('Account')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @RegisterSwaggerDecorator()
  async register(@Body() dto: CreateUserDto): Promise<RegisterRdo> {
    return this.accountService.createUser(dto);
  }

  @Post('login')
  @LoginSwaggerDecorator()
  async login(@Body() dto: LoginUserDto): Promise<LoginRdo> {
    return this.accountService.login(dto);
  }

  @Patch('change-password')
  @UseGuards(JwtAuthGuard)
  @ChangePasswordSwaggerDecorator()
  async changePassword(
    @Body() dto: ChangeUserPasswordDto,
    @CurrentUser('id') id: string
  ): Promise<ChangePasswordRdo> {
    return this.accountService.changePassword(dto, id);
  }

  @Post('refresh')
  @UseGuards(JwtAuthGuard)
  @RefreshSwaggerDecorator()
  async refreshTokens(@Body() dto: RefreshTokenDto): Promise<RefreshRdo> {
    return this.accountService.refreshTokens(dto);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @LogoutSwaggerDecorator()
  async logout(@CurrentUser('id') id: string): Promise<void> {
    return this.accountService.logout(id);
  }

  @Post('subscribe')
  @UseGuards(JwtAuthGuard)
  @SubscribeSwaggerDecorator()
  async subscribe(
    @Body() dto: SubscribeDto,
    @CurrentUser('id') currentUserId: string
  ): Promise<SubscribeRdo> {
    return this.accountService.subscribe(dto, currentUserId);
  }

  @Get('full-info/:id')
  @UseGuards(JwtAuthGuard)
  @GetUserFullInfoSwaggerDecorator()
  async getUserFullInfo(@Param('id') id: string): Promise<GetUserFullInfoRdo> {
    return this.accountService.getUserFullInfo(id);
  }

  @Post('update-posts-count')
  @UseGuards(JwtAuthGuard)
  async updatePostsCount(
    @Body() dto: UpdatePostsCountDto,
    @CurrentUser('id') currentUserId: string
  ): Promise<BaseResponse> {
    return this.accountService.updatePostsCount(currentUserId, dto.operation);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @GetUserSwaggerDecorator()
  async getUser(@Param('id') id: string): Promise<GetUserRdo> {
    return this.accountService.getUser(id);
  }
}
