import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
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

  const swaggerConfig = new DocumentBuilder()
    .setTitle('GS SisMatricula API')
    .setDescription(
      [
        'API de gerenciamento de matrículas, estudantes, filiações, turnos e mensalidades.',
        '',
        'Autenticação:',
        '1. Faça login em /api/auth/login para obter o token do tenant.',
        '2. Clique em Authorize e informe o token no esquema x-authentication-token.',
      ].join('\n'),
    )
    .setVersion('1.0.0')
    .addApiKey(
      {
        type: 'apiKey',
        in: 'header',
        name: 'x-authentication-token',
        description: 'Token do tenant retornado no endpoint de login',
      },
      'x-authentication-token',
    )
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig, {
    deepScanRoutes: true,
  });

  SwaggerModule.setup('docs', app, swaggerDocument, {
    customSiteTitle: 'GS SisMatricula API Docs',
    jsonDocumentUrl: 'docs-json',
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      docExpansion: 'none',
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
