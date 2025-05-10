import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { type CurrentUserInterface, User } from '@project/core';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'secret-jwt-key',
    });
  }

  async validate(payload: User): Promise<CurrentUserInterface> {
    return {
      id: payload.id,
      email: payload.email,
      username: payload.username,
      passwordHash: payload.passwordHash,
    };
  }
}
