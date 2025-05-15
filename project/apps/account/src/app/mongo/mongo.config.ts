import { registerAs } from '@nestjs/config';
import { MongoConfig } from '@project/core';
import * as Joi from 'joi';

const DEFAULT_MONGO_PORT = 27017;

const dbValidationSchema = Joi.object({
  host: Joi.string().hostname().required(),
  port: Joi.number().port().default(DEFAULT_MONGO_PORT),
  name: Joi.string().required(),
  user: Joi.string().required(),
  password: Joi.string().required(),
  authBase: Joi.string().required(),
});

const validateMongoConfig = (config: MongoConfig) => {
  const { error } = dbValidationSchema.validate(config);

  if (error) {
    throw new Error(`[DB Config Validation Error]: ${error.message}`);
  }
};

const getDbConfig = (): MongoConfig => {
  const config: MongoConfig = {
    host: process.env.MONGO_HOST as string,
    name: process.env.MONGO_DB as string,
    port: parseInt(process.env.MONGO_PORT ?? `${DEFAULT_MONGO_PORT}`, 10),
    user: process.env.MONGO_USER as string,
    password: process.env.MONGO_PASSWORD as string,
    authBase: process.env.MONGO_AUTH_BASE as string,
  };

  validateMongoConfig(config);

  return config;
};

export default registerAs('db', getDbConfig);
