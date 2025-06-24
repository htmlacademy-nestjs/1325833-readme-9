import { registerAs } from '@nestjs/config';
import {
  IsEnum,
  IsInt,
  IsString,
  Max,
  Min,
  ValidateNested,
  validateOrReject,
  ValidationError,
} from 'class-validator';
import { plainToClass, Transform, Type } from 'class-transformer';

enum DefaultPort {
  DEFAULT_PORT = 3003,
  DEFAULT_RABBIT_PORT = 5672,
  DEFAULT_SMTP_PORT = 8080,
}

enum Environment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  STAGE = 'stage',
}

class RabbitConfig {
  @IsString()
  host: string;

  @IsInt()
  @Min(1)
  @Max(65535)
  @Transform(({ value }) =>
    value ? parseInt(value, 10) : DefaultPort.DEFAULT_RABBIT_PORT
  )
  port: number;

  @IsString()
  password: string;

  @IsString()
  user: string;

  @IsString()
  queue: string;

  @IsString()
  exchange: string;
}

class SmtpConfig {
  @IsString()
  hostname: string;

  @IsInt()
  @Min(1)
  @Max(65535)
  @Transform(({ value }) =>
    value ? parseInt(value, 10) : DefaultPort.DEFAULT_SMTP_PORT
  )
  port: number;
}

class ApplicationConfig {
  @IsEnum(Environment)
  @Transform(({ value }) => value || Environment.DEVELOPMENT)
  environment: Environment;

  @IsInt()
  @Min(1)
  @Max(65535)
  @Transform(({ value }) =>
    value ? parseInt(value, 10) : DefaultPort.DEFAULT_PORT
  )
  port: number;

  @ValidateNested()
  @Type(() => RabbitConfig)
  rabbit: RabbitConfig;

  @ValidateNested()
  @Type(() => SmtpConfig)
  smtp: SmtpConfig;
}

const getConfig = async () => {
  const config = plainToClass(ApplicationConfig, {
    environment: process.env.NODE_ENV,
    port: process.env.PORT,
    rabbit: {
      host: process.env.RABBIT_HOST,
      port: process.env.RABBIT_PORT,
      password: process.env.RABBIT_PASSWORD,
      user: process.env.RABBIT_USER,
      queue: process.env.RABBIT_QUEUE,
      exchange: process.env.RABBIT_EXCHANGE,
    },
    smtp: {
      hostname: process.env.FAKESMTP_HOSTNAME,
      port: process.env.FAKESMTP_PORT_SERVICE,
    },
  });

  try {
    await validateOrReject(config);

    return config;
  } catch (errors) {
    const errorMessages = (errors as ValidationError[]).flatMap((error) =>
      Object.values(error.constraints || {})
    );

    throw new Error(
      `[Notify Config Validation Errors]: ${errorMessages.join('; ')}`
    );
  }
};

export default registerAs('application', getConfig);
