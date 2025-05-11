import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
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
import { AuthUser } from './types';
import { CurrentUser } from '@project/core';

@ApiTags('Account')
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('register')
  @ApiBody({ type: CreateUserDto })
  @ApiOperation({
    summary: 'Register a new account',
    description: 'Create a new user account with email and password',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User registered successfully',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User with this email exists',
  })
  async register(@Body() dto: CreateUserDto): Promise<AuthUser> {
    return this.accountService.createUser(dto);
  }

  @Post('login')
  @ApiBody({ type: LoginUserDto })
  @ApiOperation({
    summary: 'Login to account',
    description: 'Login to account with email and password',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Login successful' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Incorrect email or password',
  })
  async login(@Body() dto: LoginUserDto): Promise<AuthUser> {
    return this.accountService.login(dto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get user info',
    description: 'Get user info by ID',
  })
  @ApiParam({
    name: 'id',
    example: '507f1f77bcf86cd799439011',
    description: 'User unique identifier',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User found successfully',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not authorized',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  async getUser(@Param('id') id: string) {
    return this.accountService.getUser(id);
  }

  @Patch('change-password')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiBody({ type: ChangeUserPasswordDto })
  @ApiOperation({
    summary: 'Change password',
    description: 'Change user password',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Password changed successfully',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User not authorized or old password is incorrect',
  })
  async changePassword(
    @Body() dto: ChangeUserPasswordDto,
    @CurrentUser('id') id: string
  ) {
    return this.accountService.changePassword(dto, id);
  }
}
