import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerConfig } from './common/swagger/swagger.config';
import { ResponseInterceptor } from './common/interceptor/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{ cors: true });

  const responseInterceptor = new ResponseInterceptor();
  app.useGlobalInterceptors(responseInterceptor);

  const configService = app.get(ConfigService);
  if (configService.get<string>('APP_ENV') !== 'prod') {
    SwaggerConfig.swaggerSetup(app);
  }

  const PORT = configService.get<number>('APP_PORT', 8000);
  await app.listen(PORT, '0.0.0.0');
}
bootstrap();