import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthUser } from './types';
import { ChangeUserPasswordDto, CreateUserDto, LoginUserDto } from './dto';
import * as bcrypt from 'bcrypt';
import { PublicUser } from '@project/core';
import { JwtService } from '@nestjs/jwt';
import { AccountExceptions } from './constants';

@Injectable()
export class AccountService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) {}

  async createUser(dto: CreateUserDto): Promise<AuthUser> {
    const existingUser = await this.userRepository.findByEmail(dto.email);

    if (existingUser) {
      throw new ConflictException(AccountExceptions.USER_ALREADY_EXISTS);
    }

    const passwordHash = await this.hashPassword(dto.password);

    const { password, ...restDto } = dto;
    const newUserPayload = {
      ...restDto,
      registrationDate: new Date(),
      subscribersCount: 0,
      postsCount: 0,
    };

    const newUser = await this.userRepository.create({
      ...newUserPayload,
      passwordHash,
    });

    return { jwt: this.jwtService.sign({ ...newUserPayload, id: newUser.id }) };
  }

  async login(dto: LoginUserDto): Promise<AuthUser> {
    const user = await this.userRepository.findByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException(AccountExceptions.USER_NOT_FOUND);
    }

    const isPasswordMatched = await bcrypt.compare(
      dto.password,
      user.passwordHash
    );

    if (!isPasswordMatched) {
      throw new UnauthorizedException(AccountExceptions.PASSWORD_DO_NOT_MATCH);
    }

    const { passwordHash, ...restUser } = user;

    return { jwt: this.jwtService.sign(restUser) };
  }

  async getUser(id: string): Promise<PublicUser> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException(AccountExceptions.USER_NOT_FOUND);
    }

    const { id: userId, registrationDate, subscribersCount, postsCount } = user;

    return {
      id: userId,
      postsCount,
      registrationDate,
      subscribersCount,
    };
  }

  async changePassword(dto: ChangeUserPasswordDto, id: string) {
    const existingUser = await this.userRepository.findById(id);

    if (!existingUser) {
      throw new UnauthorizedException(AccountExceptions.USER_NOT_FOUND);
    }

    const isPasswordMatched = await bcrypt.compare(
      dto.currentPassword,
      existingUser.passwordHash
    );

    if (!isPasswordMatched) {
      throw new UnauthorizedException(
        AccountExceptions.OLD_PASSWORD_DO_NOT_MATCH
      );
    }

    const passwordHash = await this.hashPassword(dto.newPassword);

    return this.userRepository.update({ passwordHash }, id);
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);

    return bcrypt.hash(password, salt);
  }
}
