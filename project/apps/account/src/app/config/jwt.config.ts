import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const DEFAULT_JWT_EXPIRES_IN = '7d';

export interface JwtConfig {
  secret: string;
  expiresIn: string;
}

const jwtValidationSchema = Joi.object({
  secret: Joi.string().required(),
  expiresIn: Joi.string().default(DEFAULT_JWT_EXPIRES_IN),
});

const validateJwtConfig = (config: JwtConfig) => {
  const { error } = jwtValidationSchema.validate(config);

  if (error) {
    throw new Error(`[Jwt Config Validation Error]: ${error.message}`);
  }
};

const getJwtConfig = (): JwtConfig => {
  const config: JwtConfig = {
    secret: process.env.JWT_SECRET!,
    expiresIn: process.env.JWT_EXPIRES_IN ?? DEFAULT_JWT_EXPIRES_IN,
  };

  validateJwtConfig(config);

  return config;
};

export default registerAs('jwt', getJwtConfig);
