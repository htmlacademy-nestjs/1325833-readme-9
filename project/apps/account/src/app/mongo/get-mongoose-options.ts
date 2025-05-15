import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { getMongoConnectionString } from '@project/core';

export const getMongooseOptions = (): MongooseModuleAsyncOptions => ({
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    uri: getMongoConnectionString({
      user: configService.get<string>('db.user') as string,
      name: configService.get<string>('db.name') as string,
      password: configService.get<string>('db.password') as string,
      host: configService.get<string>('db.host') as string,
      port: configService.get<number>('db.port') as number,
      authBase: configService.get<string>('db.authBase') as string,
    }),
  }),
});
