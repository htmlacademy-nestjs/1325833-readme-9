import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NotifyModule } from './app/notify.module';
import { ConfigService } from '@nestjs/config';
import { setupSwagger } from '@project/swagger';
import { GLOBAL_PREFIX } from '@project/core';

async function bootstrap() {
  const app = await NestFactory.create(NotifyModule);

  app.setGlobalPrefix(GLOBAL_PREFIX);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );

  const configService = app.get(ConfigService);
  const port = configService.get('application.port');

  setupSwagger(app);

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${GLOBAL_PREFIX}`
  );
}

bootstrap();
