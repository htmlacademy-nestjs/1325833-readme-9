import { registerAs } from '@nestjs/config';
import {
  IsEnum,
  IsInt,
  IsString,
  Max,
  Min,
  validateOrReject,
  ValidationError,
} from 'class-validator';
import { plainToClass, Transform } from 'class-transformer';

enum Environment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  STAGE = 'stage',
}

const DEFAULT_PORT = 3004;

class ApplicationConfig {
  @IsEnum(Environment)
  @Transform(({ value }) => value || Environment.DEVELOPMENT)
  environment: Environment;

  @IsInt()
  @Min(1)
  @Max(65535)
  @Transform(({ value }) => (value ? parseInt(value, 10) : DEFAULT_PORT))
  port: number;

  @IsString()
  accountServiceUrl: string;

  @IsString()
  blogServiceUrl: string;

  @IsString()
  filesStorageServiceUrl: string;
}

const getConfig = async () => {
  const config: ApplicationConfig = plainToClass(ApplicationConfig, {
    environment: process.env.NODE_ENV,
    port: process.env.PORT,
    accountServiceUrl: process.env.ACCOUNT_SERVICE_URL,
    blogServiceUrl: process.env.BLOG_SERVICE_URL,
    filesStorageServiceUrl: process.env.FILES_STORAGE_SERVICE_URL,
  });

  try {
    await validateOrReject(config);

    return config;
  } catch (errors) {
    const errorMessages = (errors as ValidationError[]).flatMap((error) =>
      Object.values(error.constraints || {})
    );

    throw new Error(
      `[ApiGateway Config Validation Errors]: ${errorMessages.join('; ')}`
    );
  }
};

export default registerAs('application', getConfig);
