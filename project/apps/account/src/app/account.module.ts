import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret-jwt-key',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AccountController],
  providers: [AccountService, JwtStrategy, UserRepository],
})
export class AccountModule {}
