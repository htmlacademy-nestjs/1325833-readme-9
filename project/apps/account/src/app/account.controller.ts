import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Param,
  UseGuards,
  HttpStatus,
  Post,
  Body,
  Patch,
} from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AccountService } from './account.service';
import { ChangeUserPasswordDto, CreateUserDto, LoginUserDto } from './dto';
import { AccountResponse } from './types';
import { CurrentUser } from '@project/core';

@ApiTags('Account')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('register')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User registered successfully',
  })
  async register(@Body() dto: CreateUserDto): Promise<AccountResponse> {
    return this.accountService.createUser(dto);
  }

  @Post('login')
  @ApiResponse({ status: HttpStatus.OK, description: 'Login successful' })
  async login(@Body() dto: LoginUserDto): Promise<AccountResponse> {
    return this.accountService.login(dto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User found successfully',
  })
  async getUser(@Param('id') id: string) {
    return this.accountService.getUser(id);
  }

  @Patch('change-password')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Password changed successfully',
  })
  async changePassword(
    @Body() dto: ChangeUserPasswordDto,
    @CurrentUser('id') userId: string
  ) {
    return this.accountService.changePassword(dto, userId);
  }
}
