import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserRepository } from './user.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig } from '@project/core';
import { accountConfig, jwtConfig } from './config';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoConfig, getMongooseOptions } from './mongo';
import { UserEntity, UserSchema } from './entities';

const ENV_ACCOUNT_FILE_PATH = 'apps/account/account.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [accountConfig, mongoConfig, jwtConfig],
      envFilePath: ENV_ACCOUNT_FILE_PATH,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
    MongooseModule.forRootAsync(getMongooseOptions()),
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }]),
  ],
  controllers: [AccountController],
  providers: [JwtStrategy, AccountService, UserRepository],
})
export class AccountModule {}
