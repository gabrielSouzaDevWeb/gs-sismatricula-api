import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './shared/filters/http-exception.filter';
import { GeoBlockGuard, HostnameGuard, UserAgentGuard } from './shared/guards';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});
  const reflector = app.get(Reflector);

  // Filtros e pipes globais
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // CORS configuration
  app.enableCors({
    origin: [
      'https://gs-sismatricula-app.apps.gabrielsouzadevweb.com.br/',
      'http://gs-sismatricula-app.apps.gabrielsouzadevweb.com.br/',
      'gabrielsouzadevweb.com.br',
      '*gabrielsouzadevweb.com.br*',
      'localhost',
      '127.0.0.1',
      'http://localhost:4200',
      'http://127.0.0.1:4200',
      'http://localhost:8080',
      'http://127.0.0.1:8080',
      'https://gabrielsouzadevweb.com.br',
      'https://*gabrielsouzadevweb.com.br*',
      'https://*gabrielsouzadevweb.com.br*',
      process.env.FRONTEND_URL,
    ],
    credentials: true,
  });

  // Guards de segurança globais
  app.useGlobalGuards(
    new GeoBlockGuard(),
    new UserAgentGuard(),
    new HostnameGuard(),
  );

  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
