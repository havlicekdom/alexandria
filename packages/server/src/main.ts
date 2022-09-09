import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { DelayInterceptor } from './interceptors/delay.interceptor';

async function bootstrap() {
  const ENV = process.env.NODE_ENV;

  const app = await NestFactory.create(AppModule, {
    logger:
      ENV === 'production'
        ? ['error', 'warn']
        : ['log', 'error', 'warn', 'debug', 'verbose'],
  });
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new DelayInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Personal finance')
    .setDescription('API for personal finance app')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(parseInt(process.env.PORT, 10) || 3000);
}
bootstrap();
