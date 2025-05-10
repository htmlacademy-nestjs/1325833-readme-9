import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AccountResponse } from './types';
import { ChangeUserPasswordDto, CreateUserDto, LoginUserDto } from './dto';
import * as bcrypt from 'bcrypt';
import { type CurrentUserInterface, PublicUser } from '@project/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AccountService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) {}

  async createUser(dto: CreateUserDto): Promise<AccountResponse> {
    const existingUser = await this.userRepository.findByEmail(dto.email);

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const passwordHash = await this.hashPassword(dto.password);

    const { password, ...restDto } = dto;
    const newUserPayload = {
      ...restDto,
      registrationDate: new Date(),
      subscribersCount: 0,
      postsCount: 0,
    };

    await this.userRepository.create({
      ...newUserPayload,
      passwordHash,
    });

    return { jwt: this.jwtService.sign(newUserPayload) };
  }

  async login(dto: LoginUserDto): Promise<AccountResponse> {
    const user = await this.userRepository.findByEmail(dto.email);

    if (user) {
      const isPasswordMatched = await bcrypt.compare(
        dto.password,
        user.passwordHash
      );

      if (!isPasswordMatched) {
        throw new UnauthorizedException('Passwords do not match');
      }

      const { passwordHash, ...restUser } = user;

      return { jwt: this.jwtService.sign(restUser) };
    }

    throw new UnauthorizedException('User not found');
  }

  async getUser(id: string): Promise<PublicUser> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const { id: userId, registrationDate, subscribersCount, postsCount } = user;

    return {
      id: userId,
      postsCount,
      registrationDate,
      subscribersCount,
    };
  }

  async changePassword(
    dto: ChangeUserPasswordDto,
    currentUser: CurrentUserInterface
  ) {
    const isPasswordMatched = await bcrypt.compare(
      dto.currentPassword,
      currentUser.passwordHash
    );

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Old password do not match');
    }

    const passwordHash = await this.hashPassword(dto.newPassword);

    return this.userRepository.updateUser({ passwordHash }, currentUser.id);
  }

  private async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);

    return bcrypt.hash(password, salt);
  }
}
