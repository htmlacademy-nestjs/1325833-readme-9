import { RabbitMqConfig } from '../types';

export const getRabbitMQConnectionString = ({
  user,
  password,
  host,
  port,
}: RabbitMqConfig): string => `amqp://${user}:${password}@${host}:${port}`;
