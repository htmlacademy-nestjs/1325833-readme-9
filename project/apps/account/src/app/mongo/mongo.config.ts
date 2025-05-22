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

const validateMongoConfig = (config: MongoConfig): MongoConfig => {
  const { error, value } = dbValidationSchema.validate(config);

  if (error) {
    throw new Error(`[DB Config Validation Error]: ${error.message}`);
  }

  return value;
};

const getDbConfig = (): MongoConfig => {
  const rawConfig = {
    host: process.env.MONGO_HOST,
    name: process.env.MONGO_DB,
    port: process.env.MONGO_PORT,
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    authBase: process.env.MONGO_AUTH_BASE,
  };

  return validateMongoConfig(rawConfig as unknown as MongoConfig);
};

export default registerAs('db', getDbConfig);
