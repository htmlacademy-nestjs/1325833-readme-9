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
import { ChangeUserPasswordDto, CreateUserDto, LoginUserDto } from './dto';
import { CurrentUser, JwtAuthGuard } from '@project/core';
import {
  RegisterSwaggerDecorator,
  LoginSwaggerDecorator,
  GetUserSwaggerDecorator,
  ChangePasswordSwaggerDecorator,
} from './swagger';
import { ChangePasswordRdo, GetUserRdo, LoginRdo, RegisterRdo } from './rdo';

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

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @GetUserSwaggerDecorator()
  async getUser(@Param('id') id: string): Promise<GetUserRdo> {
    return this.accountService.getUser(id);
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
}
