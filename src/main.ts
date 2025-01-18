import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{ cors: true });
  const configService = app.get(ConfigService);
  
  const PORT = configService.get<number>('APP_PORT', 8000);
  await app.listen(PORT, '0.0.0.0');
}
bootstrap();