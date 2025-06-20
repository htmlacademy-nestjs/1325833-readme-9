import { MongoConfig } from '../types';

export const getMongoConnectionString = ({
  user,
  password,
  host,
  port,
  name,
  authBase,
}: MongoConfig): string =>
  `mongodb://${user}:${password}@${host}:${port}/${name}?authSource=${authBase}`;
