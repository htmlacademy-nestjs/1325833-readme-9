import { ConfigService } from '@nestjs/config';
import { getRabbitMQConnectionString } from '../helpers';
import { RabbitMQConfig } from '@golevelup/nestjs-rabbitmq';

export const getRabbitMqOptions = (optionSpace: string) => {
  const getOption = (option: string) => `${optionSpace}.${option}`;

  return {
    inject: [ConfigService],
    useFactory: async (
      configService: ConfigService
    ): Promise<RabbitMQConfig> => ({
      exchanges: [
        {
          name: configService.get<string>(getOption('exchange')) as string,
          type: 'topic',
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
