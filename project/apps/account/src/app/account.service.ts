import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AccountExceptions, TokenExpirations } from './constants';
import { v4 as uuidv4 } from 'uuid';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import {
  RABBIT_EXCHANGE,
  RabbitRouting,
  CreateUserDto,
  LoginUserDto,
  ChangeUserPasswordDto,
  RefreshTokenDto,
  SubscribeDto,
  ChangePasswordRdo,
  GetUserRdo,
  LoginRdo,
  RefreshRdo,
  RegisterRdo,
  SubscribeRdo,
} from '@project/core';

@Injectable()
export class AccountService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly amqpConnection: AmqpConnection
  ) {}

  async createUser(dto: CreateUserDto): Promise<RegisterRdo> {
    const existingUser = await this.userRepository.findByEmail(dto.email);

    if (existingUser) {
      throw new ConflictException(AccountExceptions.USER_ALREADY_EXISTS);
    }

    const passwordHash = await this.hashPassword(dto.password);

    const { password, ...restDto } = dto;
    const newUserPayload = {
      ...restDto,
      refreshTokenId: null,
      registrationDate: new Date(),
      postsCount: 0,
    };

    await this.userRepository.create({
      ...newUserPayload,
      passwordHash,
    });

    await this.amqpConnection.publish(
      RABBIT_EXCHANGE,
      RabbitRouting.Register,
      newUserPayload.email
    );

    return { isSuccess: true };
  }

  async login(dto: LoginUserDto): Promise<LoginRdo> {
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

    const refreshTokenId = uuidv4();

    await this.userRepository.updateRefreshTokenId(user._id, refreshTokenId);

    const { passwordHash, _id: userId, ...restUser } = user;

    return this.generateTokens(user._id, refreshTokenId, {
      id: userId,
      ...restUser,
    });
  }

  async refreshTokens(dto: RefreshTokenDto): Promise<RefreshRdo> {
    let payload: { sub: string; jti: string };

    try {
      payload = await this.jwtService.verifyAsync(dto.refreshToken, {
        ignoreExpiration: false,
      });
    } catch {
      throw new ForbiddenException(AccountExceptions.INVALID_REFRESH_TOKEN);
    }

    if (!payload || !payload.sub || !payload.jti) {
      throw new ForbiddenException(AccountExceptions.INVALID_REFRESH_TOKEN);
    }

    const user = await this.userRepository.findById(payload.sub);

    if (!user) {
      throw new NotFoundException(AccountExceptions.USER_NOT_FOUND);
    }

    if (user.refreshTokenId !== payload.jti) {
      throw new ForbiddenException(AccountExceptions.REFRESH_TOKEN_REVOKED);
    }

    const newRefreshTokenId = uuidv4();
    await this.userRepository.updateRefreshTokenId(user._id, newRefreshTokenId);

    const { passwordHash, _id: userId, ...restUser } = user;

    return this.generateTokens(user._id, newRefreshTokenId, {
      id: userId,
      ...restUser,
    });
  }

  async getUser(id: string): Promise<GetUserRdo> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException(AccountExceptions.USER_NOT_FOUND);
    }

    const { _id: userId, registrationDate, postsCount, subscribers } = user;

    return {
      id: userId,
      postsCount,
      registrationDate,
      subscribersCount: subscribers.length,
    };
  }

  async changePassword(
    dto: ChangeUserPasswordDto,
    id: string
  ): Promise<ChangePasswordRdo> {
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

  async logout(userId: string) {
    await this.userRepository.updateRefreshTokenId(userId, null);
  }

  async subscribe(
    { userId }: SubscribeDto,
    currentUserId: string
  ): Promise<SubscribeRdo> {
    if (userId === currentUserId) {
      throw new BadRequestException(
        AccountExceptions.USER_CANT_SUBSCRIBE_FOR_YOURSELF
      );
    }

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundException(AccountExceptions.USER_NOT_FOUND);
    }

    if (user.subscribers.includes(currentUserId)) {
      throw new NotFoundException(AccountExceptions.USER_ALREADY_SUBSCRIBED);
    }

    return this.userRepository.update(
      {
        subscribers: [...user.subscribers, currentUserId],
      },
      userId
    );
  }

  private async generateTokens<T>(
    userId: string,
    refreshTokenId: string,
    refreshTokenData: T
  ): Promise<LoginRdo> {
    const payload = {
      sub: userId,
      jti: refreshTokenId,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { ...payload, ...refreshTokenData, refreshTokenId: payload.jti },
        {
          expiresIn: TokenExpirations.ACCESS_TOKEN,
        }
      ),
      this.jwtService.signAsync(payload, {
        expiresIn: TokenExpirations.REFRESH_TOKEN,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
      expiresIn: TokenExpirations.ACCESS_TOKEN,
    };
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);

    return bcrypt.hash(password, salt);
  }
}
