import { registerAs } from '@nestjs/config';
import {
  IsInt,
  Min,
  Max,
  IsEnum,
  validateOrReject,
  ValidationError,
} from 'class-validator';
import { plainToClass, Transform } from 'class-transformer';

const DEFAULT_PORT = 3001;

enum Environment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  STAGE = 'stage',
}

export class ApplicationConfig {
  @IsEnum(Environment)
  @Transform(({ value }) => value || Environment.DEVELOPMENT)
  environment: Environment;

  @IsInt()
  @Min(1)
  @Max(65535)
  @Transform(({ value }) => (value ? parseInt(value, 10) : DEFAULT_PORT))
  port: number;
}

const getConfig = async () => {
  const config = plainToClass(ApplicationConfig, {
    environment: process.env.NODE_ENV,
    port: process.env.PORT,
  });

  try {
    await validateOrReject(config);
  } catch (errors) {
    const errorMessages = (errors as ValidationError[]).flatMap((error) =>
      Object.values(error.constraints || {})
    );

    throw new Error(
      `[Application Config Validation Errors]: ${errorMessages.join('; ')}`
    );
  }

  return config;
};

export default registerAs('application', getConfig);
