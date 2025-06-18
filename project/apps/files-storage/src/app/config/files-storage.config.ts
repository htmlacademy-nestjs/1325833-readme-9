import { registerAs } from '@nestjs/config';
import {
  IsEnum,
  IsInt,
  IsString,
  Min,
  Max,
  validateOrReject,
  ValidateNested,
  IsPort,
  ValidationError,
} from 'class-validator';
import { plainToClass, Transform, Type } from 'class-transformer';

const DEFAULT_PORT = 3002;
const DEFAULT_MONGO_PORT = 27017;

enum Environment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  STAGE = 'stage',
}

class DbConfig {
  @IsString()
  host: string;

  @IsInt()
  @Min(1)
  @Max(65535)
  @Transform(({ value }) => (value ? parseInt(value, 10) : DEFAULT_MONGO_PORT))
  port: number;

  @IsString()
  name: string;

  @IsString()
  user: string;

  @IsString()
  password: string;

  @IsString()
  authBase: string;
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

  @IsString()
  uploadDirectory: string;

  @IsString()
  serveRoot: string;

  @ValidateNested()
  @Type(() => DbConfig)
  db: DbConfig;
}

const getConfig = async () => {
  const config = plainToClass(ApplicationConfig, {
    environment: process.env.NODE_ENV,
    port: process.env.PORT,
    uploadDirectory: process.env.UPLOAD_DIRECTORY_PATH,
    serveRoot: process.env.SERVE_ROOT,
    db: {
      host: process.env.MONGO_HOST,
      port: process.env.MONGO_PORT,
      name: process.env.MONGO_DB,
      user: process.env.MONGO_USER,
      password: process.env.MONGO_PASSWORD,
      authBase: process.env.MONGO_AUTH_BASE,
    },
  });

  try {
    await validateOrReject(config);
  } catch (errors) {
    const errorMessages = (errors as ValidationError[]).flatMap((error) =>
      Object.values(error.constraints || {})
    );
    throw new Error(
      `[FilesStorage Config Validation Errors]: ${errorMessages.join('; ')}`
    );
  }

  return config;
};

export default registerAs('application', getConfig);
