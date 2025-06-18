import { ConfigService } from '@nestjs/config';
import { getRabbitMQConnectionString } from '../helpers';

export const getRabbitMqOptions = (optionSpace: string) => {
  const getOption = (option: string) => `${optionSpace}.${option}`;

  return {
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      exchanges: [
        {
          name: configService.get<string>(getOption('queue')),
          type: 'direct',
        },
      ],
      uri: getRabbitMQConnectionString({
        host: configService.get<string>(getOption('host')) as string,
        password: configService.get<string>(getOption('password')) as string,
        port: configService.get<string>(getOption('port')) as string,
        user: configService.get<string>(getOption('user')) as string,
      }),
      connectionInitOptions: { wait: true },
      enableControllerDiscovery: true,
    }),
  };
};
