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

const validateJwtConfig = (config: JwtConfig): JwtConfig => {
  const { error, value } = jwtValidationSchema.validate(config);

  if (error) {
    throw new Error(`[Jwt Config Validation Error]: ${error.message}`);
  }

  return value;
};

const getJwtConfig = (): JwtConfig => {
  const rawConfig = {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  };

  return validateJwtConfig(rawConfig as unknown as JwtConfig);
};

export default registerAs('jwt', getJwtConfig);
