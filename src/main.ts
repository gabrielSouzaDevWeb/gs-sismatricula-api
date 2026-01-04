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
