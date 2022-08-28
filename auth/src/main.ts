import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  let configService = new ConfigService();

  let host = configService.get('AUTH_SERVICE_HOST');
  let port = configService.get('AUTH_SERVICE_PORT');

  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: configService.get('AUTH_SERVICE_HOST'),
      port: configService.get('AUTH_SERVICE_PORT'),
    },
  });
  await app.listen();
  Logger.log(`Auth service is running on ` + configService.get('AUTH_SERVICE_HOST') + ':' + configService.get('AUTH_SERVICE_PORT'));
}
bootstrap();