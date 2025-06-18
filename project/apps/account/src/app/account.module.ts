import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig, getRabbitMqOptions, jwtConfig } from '@project/core';
import { JwtStrategy } from './strategies';
import { accountConfig } from './config';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoConfig, getMongooseOptions } from './mongo';
import { UserEntity, UserSchema } from './entities';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

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
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMqOptions('application.rabbit')
    ),
  ],
  controllers: [AccountController],
  providers: [JwtStrategy, AccountService, UserRepository],
})
export class AccountModule {}
