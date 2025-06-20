import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { getMongoConnectionString } from '@project/core';

export const getMongooseOptions = (): MongooseModuleAsyncOptions => ({
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    uri: getMongoConnectionString({
      user: configService.get<string>('application.db.user') as string,
      name: configService.get<string>('application.db.name') as string,
      password: configService.get<string>('application.db.password') as string,
      host: configService.get<string>('application.db.host') as string,
      port: configService.get<number>('application.db.port') as number,
      authBase: configService.get<string>('application.db.authBase') as string,
    }),
  }),
});
